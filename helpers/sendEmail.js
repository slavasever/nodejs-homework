const { SENDGRID_API_KEY, EMAIL_FROM } = process.env;
const sgMail = require("@sendgrid/mail");

sgMail.setApiKey(SENDGRID_API_KEY);

const sendEmail = async (data) => {
  try {
    const email = { ...data, from: EMAIL_FROM };

    await sgMail.send(email);
    return true;
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = sendEmail;
