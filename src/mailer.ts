import express from 'express';
import cors from 'cors';
import serverless from 'serverless-http';
import nodemailer from 'nodemailer';

const options = {
    host: process.env.MAILER_HOST || '',
    port: process.env.MAILER_PORT || '',
    secure: process.env.MAILER_SECURE || '',
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
        const mailer = await transporter.sendMail({from, to, subject, text, replyTo});
        console.log(mailer);
        res.status(202).send();
    } catch (e) {
        res.status(400).send(e);
    }
});

app.use(cors({origin: /((.*)\.)?(mfcodeworks\.com)$/}));
app.use(express.json());
app.use('/.netlify/functions/mailer', router);

export const handler = serverless(app);