const nodemailer = require("nodemailer");

module.exports = async (email, subject, content) => {
  let transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: "lekturapp16@gmail.com",
      pass: "admin1234!",
    },
  });
  let info = await transporter.sendMail({
    from: '"Lektur App" <no-reply@lektur.com>',
    to: email,
    subject: subject,
    text: "",
    html: content,
  });
};
