const { Schema, model } = require("mongoose");
const Joi = require("joi");

const subscriptionType = ["starter", "pro", "business"];

const userSchema = Schema(
  {
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    subscription: {
      type: String,
      enum: subscriptionType,
      default: "starter",
    },
    avatarURL: {
      type: String,
      required: true,
    },
    token: {
      type: String,
      default: null,
    },
    verify: {
      type: Boolean,
      default: false,
    },
    verificationToken: {
      type: String,
      required: [true, "Verify token is required"],
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const User = model("user", userSchema);

const signupSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().required(),
  subscription: Joi.string().valueOf(...subscriptionType),
});

const updateSubscriptionSchema = Joi.object({
  subscription: Joi.string()
    .valid(...subscriptionType)
    .required(),
});

const verifyEmailSchema = Joi.object({
  email: Joi.string().required(),
});

const schemas = {
  signupSchema,
  updateSubscriptionSchema,
  verifyEmailSchema,
};

module.exports = {
  schemas,
  User,
};
