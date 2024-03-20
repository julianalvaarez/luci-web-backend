import { resend } from "../libs/resend.js";

export const sendMessagesModel = async (name, email, subject, message) => {
    const { data, error } = await resend.emails.send({
        from: 'Acme <onboarding@resend.dev>',
        to: ["julialva2008@gmail.com", "lucianacresiaalvarez@gmail.com"],
        subject: `${subject}: ${name} - ${email}`,
        html: message,
    });

    return { data, error }
}