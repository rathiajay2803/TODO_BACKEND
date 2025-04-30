import nodemailer from 'nodemailer';
import { config } from '../config/server.config.js';
import BadGateway from '../errors/badGateway.js';

const sendmail = async (user, verificationLink) => {
  const mailOptions = {
    from: `"TODO App" ${config.SMTP_SENDER}`,
    to: user.email,
    subject: 'Verify your email to complete registration ✅ on TODO app',

    text: `Hi ${user.name},\n\nThanks for signing up for TODO App! Please verify your email address by clicking the link below:\n\n${verificationLink}\n\nIf you didn’t sign up, you can ignore this email.\n\n- The TODO App Team`,

    html: `<div style="font-family: Arial, sans-serif; line-height: 1.5; color: #333;">
            <h2>Hi ${user.name},</h2>
            <p>Thanks for signing up for <strong>TODO App</strong>! Please verify your email address to activate your account.</p>
            <p style="margin: 20px 0;">
              <a href="${verificationLink}" style="display:inline-block; background-color:#4F46E5; color:#fff; padding:12px 24px; text-decoration:none; border-radius:5px;">Verify Email Address</a>
            </p>
            <p>If the button above doesn't work, copy and paste the following link into your browser:</p>
            <p><a href="${verificationLink}">${verificationLink}</a></p>
            <hr style="margin-top: 30px;">
            <p style="font-size: 12px; color: #888;">If you didn't create a TODO App account, you can safely ignore this message.</p>
          </div>`,
  };

  try {
    const transporter = nodemailer.createTransport({
      host: config.SMTP_HOST,
      port: config.SMTP_PORT,
      secure: false,
      auth: {
        user: config.SMTP_USERNAME,
        pass: config.SMTP_PASSWORD,
      },
    });

    const info = await transporter.sendMail(mailOptions);

    return info;
  } catch (err) {
    console.log('Mailer service fails', err);
    throw new BadGateway('SendMail', {
      serviceName: 'sendMail',
      msg: `Getting error while sending mail to user ${user.name}- ${user.email}`,
    });
  }
};

export default sendmail;
