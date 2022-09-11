const { User } = require("../../models/users/User");
const { RequestError } = require("../../helpers");

const verifyEmail = async (req, res, next) => {
  try {
    const { verificationToken } = req.params;

    const user = await User.findOne({ verificationToken });
    if (!user) {
      throw RequestError(404, "User not found");
    }

    await User.findOneAndUpdate(
      { verificationToken },
      { verify: true, verificationToken: null }
    );
    res.status(200).json("Verification success");
  } catch (error) {
    next(error);
  }
};

module.exports = verifyEmail;
