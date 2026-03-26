import { Resend } from "resend"
import type { IncomingMessage, ServerResponse } from "node:http"
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

const createFeedbackHandler = (resendApiKey?: string) => {
  return async (req: IncomingMessage, res: ServerResponse, next: () => void) => {
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
          server.middlewares.use(feedbackHandler)
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
