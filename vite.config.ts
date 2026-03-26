import { Resend } from "resend"
import type { IncomingMessage, ServerResponse } from "node:http"
import { createElement, type ComponentType } from "react"
import { renderToStaticMarkup } from "react-dom/server"
import { defineConfig, loadEnv } from 'vite'
import path from "path"
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

type FeedbackRequest = {
  to: string
  from: string
  subject: string
  html: string
  replyTo?: string
}

type RenderFeedbackRequest = {
  message: string
  email?: string
}

type EmailTemplateProps = {
  message: string
}

type RenderFeedbackHtml = (message: string, email?: string) => Promise<string>

const escapeHtml = (value: string) => value
  .replace(/&/g, "&amp;")
  .replace(/</g, "&lt;")
  .replace(/>/g, "&gt;")
  .replace(/"/g, "&quot;")
  .replace(/'/g, "&#39;")

const buildFeedbackEmailHtml = (message: string, email?: string) => {
  const safeMessage = escapeHtml(message).replace(/\r?\n/g, "<br />")
  const senderSection = email
    ? `<p style="margin:0 0 12px;color:#6b7280;font-size:14px;line-height:1.5"><strong>From:</strong> ${escapeHtml(email)}</p>`
    : ""

  return `<!doctype html>
<html>
  <body style="margin:0;padding:24px;background:#fcfaf8;font-family:Inter,Segoe UI,Arial,sans-serif;color:#111827">
    <div style="max-width:640px;margin:0 auto;background:#ffffff;border:1px solid #e5e7eb;border-radius:12px;padding:24px">
      <p style="margin:0;color:#6b7280;font-size:12px;letter-spacing:0.08em;text-transform:uppercase">Theam Dreater Feedback</p>
      <h1 style="margin:8px 0 12px;font-size:24px;line-height:1.3;color:#111827">New Customer Message</h1>
      ${senderSection}
      <div style="margin-top:16px;background:#f3f4f6;border-radius:8px;padding:16px">
        <p style="margin:0 0 8px;color:#6b7280;font-size:12px;letter-spacing:0.08em;text-transform:uppercase">Message</p>
        <p style="margin:0;color:#111827;font-size:16px;line-height:1.7">${safeMessage}</p>
      </div>
    </div>
  </body>
</html>`
}

const parseRequestBody = async (req: IncomingMessage): Promise<string> => {
  const chunks: Buffer[] = []

  for await (const chunk of req) {
    chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk))
  }

  return Buffer.concat(chunks).toString("utf-8")
}

const sendJson = (res: ServerResponse, statusCode: number, payload: unknown) => {
  res.statusCode = statusCode
  res.setHeader("Content-Type", "application/json")
  res.end(JSON.stringify(payload))
}

const createFeedbackHandler = (resendApiKey?: string, renderFeedbackHtml?: RenderFeedbackHtml) => {
  return async (req: IncomingMessage, res: ServerResponse, next: () => void) => {
    if (req.url === "/api/feedback/render") {
      if (req.method !== "POST") {
        sendJson(res, 405, { error: "Method Not Allowed" })
        return
      }

      try {
        const rawBody = await parseRequestBody(req)
        const body = JSON.parse(rawBody) as Partial<RenderFeedbackRequest>

        if (!body.message || !body.message.trim()) {
          sendJson(res, 400, { error: "Message is required" })
          return
        }

        const html = renderFeedbackHtml
          ? await renderFeedbackHtml(body.message.trim(), body.email?.trim())
          : buildFeedbackEmailHtml(body.message.trim(), body.email?.trim())
        sendJson(res, 200, { html })
      } catch (error) {
        const message = error instanceof Error ? error.message : "Unexpected server error"
        sendJson(res, 500, { error: message })
      }

      return
    }

    if (req.url !== "/api/feedback") {
      next()
      return
    }

    if (req.method !== "POST") {
      sendJson(res, 405, { error: "Method Not Allowed" })
      return
    }

    if (!resendApiKey) {
      sendJson(res, 500, { error: "Missing RESEND_API_KEY on server" })
      return
    }

    try {
      const rawBody = await parseRequestBody(req)
      const body = JSON.parse(rawBody) as Partial<FeedbackRequest>

      if (!body.to || !body.from || !body.subject || !body.html) {
        sendJson(res, 400, { error: "Missing required email fields" })
        return
      }

      const resend = new Resend(resendApiKey)
      const response = await resend.emails.send({
        to: body.to,
        from: body.from,
        subject: body.subject,
        html: body.html,
        replyTo: body.replyTo,
      })

      if (response.error) {
        sendJson(res, 400, { error: response.error.message || "Failed to send email" })
        return
      }

      sendJson(res, 200, { data: response.data })
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unexpected server error"
      sendJson(res, 500, { error: message })
    }
  }
}

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "")
  const resendApiKey = env.RESEND_API_KEY || env.VITE_RESEND_API_KEY
  const feedbackHandler = createFeedbackHandler(resendApiKey)

  return {
    plugins: [
      react(),
      tailwindcss(),
      {
        name: "feedback-email-api",
        configureServer(server) {
          let emailTemplatePromise: Promise<ComponentType<EmailTemplateProps>> | null = null

          const loadEmailTemplate = async (): Promise<ComponentType<EmailTemplateProps>> => {
            if (!emailTemplatePromise) {
              emailTemplatePromise = server.ssrLoadModule("/src/emails/Email.tsx").then((module) => {
                const template = (module as { Email?: unknown; default?: unknown }).Email
                  ?? (module as { default?: unknown }).default

                if (typeof template !== "function") {
                  throw new Error("Email template component was not found in src/emails/Email.tsx")
                }

                return template as ComponentType<EmailTemplateProps>
              })
            }

            try {
              return await emailTemplatePromise
            } catch (error) {
              // Clear rejected promise so the next request can retry loading.
              emailTemplatePromise = null
              throw error
            }
          }

          const renderWithEmailTemplate: RenderFeedbackHtml = async (message, email) => {
            try {
              const EmailTemplate = await loadEmailTemplate()
              return renderToStaticMarkup(createElement(EmailTemplate, { message }))
            } catch {
              // Fallback keeps first request from failing during cold start.
              return buildFeedbackEmailHtml(message, email)
            }
          }

          // Warm up template loading in background to reduce first-request latency/errors.
          void loadEmailTemplate().catch(() => {
            // Ignore warmup errors; render path handles fallback and retries.
          })

          server.middlewares.use(createFeedbackHandler(resendApiKey, renderWithEmailTemplate))
        },
        configurePreviewServer(server) {
          server.middlewares.use(feedbackHandler)
        },
      },
    ],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
  }
})
