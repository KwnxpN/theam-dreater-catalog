import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { SendHorizonal } from "lucide-react";

function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const email = formData.get("email");
    const message = formData.get("message");
    // Here you can handle the form data, e.g., send it to an API or log it
    console.log("Email:", email);
    console.log("Message:", message);
    // Optionally, you can reset the form after submission
    event.currentTarget.reset();
}

const FeedbackForm = () => {
    return (
        <form className="space-y-2" onSubmit={handleSubmit}>
            <Input
                id="email"
                type="email"
                placeholder="Your email"
                aria-label="Your email"
                className="border-2 border-border" />
            <Textarea
                id="message"
                aria-label="Your message"
                placeholder="What you want to tell us?"
                className="border-2 border-border resize-none h-24 thin-scrollbar"
            />
            <Button className="flex justify-self-end" type="submit">
                Send
                <SendHorizonal />
            </Button>
        </form>
    )
}

export default FeedbackForm