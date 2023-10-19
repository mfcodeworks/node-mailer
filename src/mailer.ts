import express, { Request } from 'express';
import cors from 'cors';
import serverless from 'serverless-http';
import nodemailer from 'nodemailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';

const options: SMTPTransport | SMTPTransport.Options = {
    host: process.env.MAILER_HOST || '',
    port: parseInt(process.env.MAILER_PORT || '465'),
    name: process.env.MAILER_NAME || '',
    secure: process.env.MAILER_SECURE === 'true' || true,
    auth: {
        user: process.env.MAILER_USER,
        pass: process.env.MAILER_PASS
    }
};
const transporter = nodemailer.createTransport(options as any);

export const app = express();
const router = express.Router();

router.get('/', (_, res) => res.send('Hello World ~ Mailer'));
router.post('/sendMail', async (req, res) => {
    const {from, to, subject, text, replyTo} = req.body;

    try {
        console.log('Sending mail', {from, to, subject, text, replyTo});
        const mailer = await transporter.sendMail({from, to, subject, text, replyTo});
        console.log(mailer);
        res.status(202).send();
    } catch (e) {
        res.status(400).send(e);
    }
});

router.use('/.netlify/functions/mailer', router);
const corsCheck = cors()
app.use(corsCheck);
app.use(express.json());
app.use(router)

export const handler = serverless(app);
