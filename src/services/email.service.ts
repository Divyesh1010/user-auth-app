import nodemailer from 'nodemailer';

type EmailParams = {
  email: string;
  code: number;
};
export class EmailService {
  transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.USER_EMAIL,
        pass: process.env.USER_PASSWORD,
      },
    });
  }

  sendVerificationCode({email, code}: EmailParams) {
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
      .catch((err: any) => {
        console.error('Error sending email:', err);
        throw err;
      });
  }
}
