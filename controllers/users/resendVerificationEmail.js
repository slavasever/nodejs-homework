const { RequestError, sendEmail } = require("../../helpers");
const { User } = require("../../models/users/User");
const { HOST, PORT } = process.env;

const resendVerificationEmail = async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      throw RequestError(404, "User not found");
    }

    if (user.verify) {
      throw RequestError(400, "Verification has already been passed");
    }

    const mail = {
      to: email,
      subject: "Email verification",
      html: `<a href=http://${HOST}:${PORT}/api/users/verify/${user.verificationToken} target="_blank">Click here to verify your email</a>`,
    };

    await sendEmail(mail);

    res.status(200).json("Verification email sent");
  } catch (error) {
    next(error);
  }
};

module.exports = resendVerificationEmail;
