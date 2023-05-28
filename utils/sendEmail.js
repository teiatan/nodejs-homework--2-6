const sgMail = require("@sendgrid/mail");
require("dotenv").config();

const { BASE_URL, SENDGRID_API_KEY } = process.env;

sgMail.setApiKey(SENDGRID_API_KEY);

const sendEmail = async (email, verificationToken) => {
  const emailOptions = {
    from: "protas.tb@gmail.com",
    to: email,
    subject: "Email verification",
    html: `<h3>Let's verify your email so you can start using your phonebook. </h3><a target="_blank" href="${BASE_URL}/users/verify/${verificationToken}"> Click this to verify your email or copy link: ${BASE_URL}/users/verify/${verificationToken} </a>`,
  };

  await sgMail.send(emailOptions);

  return true;
};

module.exports = sendEmail;
