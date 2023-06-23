require('dotenv').config();

// Email credentials
const EMAIL_USER = process.env.EMAIL_USER;
const EMAIL_PWD = process.env.EMAIL_PWD;

module.exports = {
    EMAIL_USER,
    EMAIL_PWD
};