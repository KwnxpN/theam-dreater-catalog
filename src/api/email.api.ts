export interface EmailData {
    to: string;
    from: string;
    subject: string;
    html: string;
    replyTo?: string;
}

export async function sendEmail(emailData: EmailData) {
    const response = await fetch("/api/feedback", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(emailData),
    });

    const result = await response.json();

    if (!response.ok) {
        throw new Error(result?.error || "Failed to send email");
    }

    return result;
}