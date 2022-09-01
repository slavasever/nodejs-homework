const express = require("express");
const ctrl = require("../../controllers/users");
const { schemas } = require("../../models/users/User");
const { validationBody, authenticate } = require("../../middlewares/");

const router = express.Router();

router.post("/signup", validationBody(schemas.signupSchema), ctrl.signup);
router.post("/login", validationBody(schemas.signupSchema), ctrl.login);
router.get("/logout", authenticate, ctrl.logout);
router.get("/current", authenticate, ctrl.current);
router.patch(
  "/",
  authenticate,
  validationBody(schemas.updateSubscriptionSchema),
  ctrl.updateSubscription
);

module.exports = router;
