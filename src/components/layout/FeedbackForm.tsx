import { useEffect, useState, type FormEvent } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { SendHorizonal } from "lucide-react";
import { useSendEmail } from "../../hooks/queries/useEmail";
import { Email } from "../../emails/Email";

const FeedbackForm = () => {
    const { mutateAsync: sendEmail, isPending } = useSendEmail();
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [emailHtml, setEmailHtml] = useState("");

    useEffect(() => {
        if (!message.trim()) {
            setEmailHtml("");
            return;
        }

        // Render in the next tick so input handling stays responsive.
        const timerId = window.setTimeout(() => {
            try {
                const html = renderToStaticMarkup(<Email message={message} />);
                setEmailHtml(html);
            } catch (error) {
                console.error("Failed to pre-render feedback email html:", error);
            }
        }, 0);

        return () => {
            window.clearTimeout(timerId);
        };
    }, [message]);

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        if (!message.trim() || !emailHtml || !email.trim()) {
            return;
        }

        try {
            await sendEmail({
                to: import.meta.env.VITE_FEEDBACK_TO_EMAIL ?? "onboarding@resend.dev",
                from: import.meta.env.VITE_FEEDBACK_FROM_EMAIL ?? "onboarding@resend.dev",
                subject: `New feedback${email ? ` from ${email}` : ""}`,
                html: emailHtml,
                replyTo: email.trim() || undefined,
            });

            setEmail("");
            setMessage("");
            setEmailHtml("");
        } catch {
            // Error is handled in mutation onError; keep user input for retry.
        }
    }
    return (
        <form className="space-y-2" onSubmit={handleSubmit}>
            <Input
                id="email"
                name="email"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="Your email"
                aria-label="Your email"
                className="border-2 border-border" />
            <Textarea
                id="message"
                name="message"
                value={message}
                onChange={(event) => setMessage(event.target.value)}
                aria-label="Your message"
                placeholder="What you want to tell us?"
                className="border-2 border-border resize-none h-24 thin-scrollbar"
            />
            <Button className="flex justify-self-end" type="submit" disabled={isPending || !message.trim() || !emailHtml || !email.trim()}>
                {isPending ? "Sending..." : "Send"}
                <SendHorizonal />
            </Button>
        </form>
    )
}

export default FeedbackForm