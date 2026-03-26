import type { FormEvent } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { SendHorizonal } from "lucide-react";
import { useSendEmail } from "../../hooks/queries/useEmail";
import { Email } from "../../emails/Email";

const FeedbackForm = () => {
    const { mutateAsync: sendEmail, isPending } = useSendEmail();

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const email = String(formData.get("email") ?? "").trim();
        const message = String(formData.get("message") ?? "").trim();

        if (!message) {
            return;
        }

        const html = renderToStaticMarkup(<Email message={message} />);

        try {
            await sendEmail({
                to: import.meta.env.VITE_FEEDBACK_TO_EMAIL ?? "onboarding@resend.dev",
                from: import.meta.env.VITE_FEEDBACK_FROM_EMAIL ?? "onboarding@resend.dev",
                subject: `New feedback${email ? ` from ${email}` : ""}`,
                html,
                replyTo: email || undefined,
            });

            event.currentTarget.reset();
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
                placeholder="Your email"
                aria-label="Your email"
                className="border-2 border-border" />
            <Textarea
                id="message"
                name="message"
                aria-label="Your message"
                placeholder="What you want to tell us?"
                className="border-2 border-border resize-none h-24 thin-scrollbar"
            />
            <Button className="flex justify-self-end" type="submit" disabled={isPending}>
                {isPending ? "Sending..." : "Send"}
                <SendHorizonal />
            </Button>
        </form>
    )
}

export default FeedbackForm