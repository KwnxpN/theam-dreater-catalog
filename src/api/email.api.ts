export interface EmailData {
    to: string;
    from: string;
    subject: string;
    html: string;
    replyTo?: string;
}

export interface RenderEmailHtmlData {
    message: string;
    email?: string;
}

export async function generateFeedbackEmailHtml(data: RenderEmailHtmlData) {
    const response = await fetch("/api/feedback/render", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });

    const result = await response.json();

    if (!response.ok) {
        throw new Error(result?.error || "Failed to render email html");
    }

    return result.html as string;
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