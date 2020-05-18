import express from 'express';
import serverless from 'serverless-http';
import { sendMail } from './mailer';

export const app = express();
const router = express.Router();

router.get('/', (req, res) => res.send('Hello World ~ Mailer'));
router.post('/sendMail', async (req, res) => {
    const {from, to, subject, text, replyTo} = req.body;

    try {
        const mailer = await sendMail(from, to, subject, text, replyTo);
        console.log(mailer);
        res.status(202).send();
    } catch (e) {
        res.status(400).send(e);
    }
});

app.use(express.json());
app.use('/.netlify/functions/server', router);

export const handler = serverless(app);