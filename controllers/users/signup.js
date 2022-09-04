const { RequestError } = require("../../helpers");
const { User } = require("../../models/users/User");
const bcrypt = require("bcryptjs");

const signup = async (req, res, next) => {
  try {
    const { email, password, subscription } = req.body;
    const user = await User.findOne({ email });

    if (user) {
      throw RequestError(409, "Email in use");
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const result = await User.create({
      email,
      password: hashPassword,
      subscription,
    });

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
