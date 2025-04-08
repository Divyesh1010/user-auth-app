"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailService = void 0;
const tslib_1 = require("tslib");
const nodemailer_1 = tslib_1.__importDefault(require("nodemailer"));
class EmailService {
    constructor() {
        this.transporter = nodemailer_1.default.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.USER_EMAIL,
                pass: process.env.USER_PASSWORD,
            },
        });
    }
    sendVerificationCode({ email, code }) {
        const mailOtions = {
            from: process.env.USER_EMAIL,
            to: email,
            subject: 'Your verification code',
            text: `Your verification code is: ${code}`,
        };
        return this.transporter
            .sendMail(mailOtions)
            .then(() => {
            console.log('Email send successfully to', email);
        })
            .catch((err) => {
            console.error('Error sending email:', err);
            throw err;
        });
    }
}
exports.EmailService = EmailService;
//# sourceMappingURL=email.service.js.map