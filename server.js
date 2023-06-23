const express = require('express');
const nodemailer = require('nodemailer');
const path = require('path');
const { EMAIL_USER, EMAIL_PWD } = require('./emailConfiguration');

const app = express();
app.use(express.json());

const transporter = nodemailer.createTransport({
    host: "smtp-mail.outlook.com", // hostname
    secureConnection: false, // TLS requires secureConnection to be false
    port: 587,
    tls: {
        ciphers: 'SSLv3'
    },
    auth: {
        user: EMAIL_USER,
        pass: EMAIL_PWD,
    },
});

app.post('/send-email', (req, res) => {
    const { to, subject, html, attachmentPath } = req.body;

    const emailOptions = {
        from: EMAIL_USER,
        to: "jonathan.mwaniki@thejitu.com",
        subject: "WEEK EIGHT REPORT",
        html: "<p>Hello Jonathan,</p><p>Please find attached the weekly report.</p>",
        attachments: [{
            filename: 'WEEK EIGHT REPORT.docx',
            path: path.join(__dirname, '../Desktop/WEEK EIGHT REPORT.docx'),
        }, ],
    };

    transporter.sendMail(emailOptions, (error, info) => {
        if (error) {
            console.log('Error occurred while sending email:', error.message);
            res.status(500).json({ error: 'Failed to send email' });
        } else {
            console.log('Email sent successfully!', info.response);
            res.json({ message: 'Email sent successfully' });
        }
    });
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});