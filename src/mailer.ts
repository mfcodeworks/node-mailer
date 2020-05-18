import nodemailer from 'nodemailer';

const options = {
    host: process.env.MAILER_HOST || '',
    port: process.env.MAILER_PORT || '',
    secure: process.env.MAILER_SECURE || '',
    auth: {
        user: process.env.MAILER_USER,
        pass: process.env.MAILER_PASS
    }
}
const transporter = nodemailer.createTransport(options as any);

export function sendMail(from: string, to: string, subject: string, text: string, replyTo?: string): Promise<any> {
    return transporter.sendMail({from, to, subject, text, replyTo});
}
