const { RequestError, sendEmail } = require("../../helpers");
const { User } = require("../../models/users/User");
const bcrypt = require("bcryptjs");
const gravatar = require("gravatar");
const { nanoid } = require("nanoid");
const { HOST, PORT } = process.env;

const signup = async (req, res, next) => {
  try {
    const { email, password, subscription } = req.body;
    const user = await User.findOne({ email });

    if (user) {
      throw RequestError(409, "Email in use");
    }

    const hashPassword = await bcrypt.hash(password, 10);
    const avatarURL = gravatar.url(email);
    const verificationToken = nanoid();

    const result = await User.create({
      email,
      password: hashPassword,
      subscription,
      avatarURL,
      verificationToken,
    });
    const mail = {
      to: email,
      subject: "Email verification",
      html: `<a href=http://${HOST}:${PORT}/api/users/verify/${verificationToken} target="_blank">Click here to verify your email</a>`,
    };
    await sendEmail(mail);

    res.status(201).json({
      user: {
        email: result.email,
        subscription: result.subscription,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = signup;
