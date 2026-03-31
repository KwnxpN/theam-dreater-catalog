import { useMutation } from "@tanstack/react-query";
import { sendEmail } from "../../api/email.api";

export const useSendEmail = () => {
    return useMutation({
        mutationFn: sendEmail,
        onSuccess: () => {
            console.log("Email sent successfully");
        },
        onError: (error) => {
            console.error("Error sending email:", error);
        },
    });
}