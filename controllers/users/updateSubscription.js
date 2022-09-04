const { User } = require("../../models/users/User");

const updateSubscription = async (req, res, next) => {
  try {
    const { _id } = req.user;
    const { subscription } = req.body;

    await User.findByIdAndUpdate(_id, { subscription });

    res
      .status(200)
      .json(
        `Subscription successfully updated to ${subscription.toUpperCase()}`
      );
  } catch (error) {
    next(error);
  }
};

module.exports = updateSubscription;
