const { RequestError } = require("../../helpers");
const { User } = require("../../models/users/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const SECRET_KEY = process.env.SECRET_KEY;

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const result = await User.findOne({ email });

    if (!result) {
      throw RequestError(401, "Email or password is wrong");
    }

    const comparePassword = await bcrypt.compare(password, result.password);

    if (!comparePassword) {
      throw RequestError(401, "Email or password is wrong");
    }

    if (!User.verify) {
      throw RequestError(401, "Email is not verified");
    }

    const payload = { id: result._id };

    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "1d" });
    await User.findByIdAndUpdate(result._id, { token });

    res.status(200).json({
      token,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = login;
