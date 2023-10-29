const nodeMailer = require("nodemailer");
const {
  HOST,
  SERVICE,
  EMAIL_PORT,
  SECURE,
  PASSWORD,
  USER_EMAIL,
} = require("../config/env");

const sendVerificationEmail = async (email, subject, text, html) => {
  try {
    const transporter = nodeMailer.createTransport({
      host: HOST,
      service: SERVICE,
      port: Number(EMAIL_PORT),
      secure: Boolean(SECURE),
      auth: {
        user: String(USER_EMAIL),
        pass: String(PASSWORD),
      },
    });

    await transporter.sendMail({
      from: {
        name: "IShop",
        address: String(USER_EMAIL),
      },
      to: email,
      subject: subject,
      text: text,
      html: html,
    });

    console.log("Email sent Success");
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

module.exports = sendVerificationEmail;
