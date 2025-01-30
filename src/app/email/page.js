import { sendEmail } from '../../utils/email';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { to, subject, text, html } = req.body;

        try {
            await sendEmail(to, subject, text, html);
            res.status(200).json({ message: 'Email sent successfully!' });
        } catch (error) {
            console.error('Email sending error:', error);
            res.status(500).json({ message: 'Failed to send email.' });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}