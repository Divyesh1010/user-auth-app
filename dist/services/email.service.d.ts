import nodemailer from 'nodemailer';
type EmailParams = {
    email: string;
    code: number;
};
export declare class EmailService {
    transporter: nodemailer.Transporter<import("nodemailer/lib/smtp-transport").SentMessageInfo, import("nodemailer/lib/smtp-transport").Options>;
    constructor();
    sendVerificationCode({ email, code }: EmailParams): Promise<void>;
}
export {};
