const { User } = require("../../models/users/User");

const current = async (req, res, next) => {
  try {
    const { _id } = req.user;

    const { email, subscription } = await User.findById(_id);

    res.status(200).json({ email, subscription });
  } catch (error) {
    next(error);
  }
};

module.exports = current;
