const express = require("express");
const ctrl = require("../../controllers/contacts");
const {
  isValidId,
  validationBody,
  authenticate,
} = require("../../middlewares");
const { schemas } = require("../../models/contacts/Contact");

const router = express.Router();

router.get("/", authenticate, ctrl.getAllContacts);

router.get("/:contactId", authenticate, isValidId, ctrl.getContactById);

router.post(
  "/",
  authenticate,
  validationBody(schemas.addSchema),
  ctrl.addContact
);

router.delete("/:contactId", authenticate, isValidId, ctrl.deleteContact);

router.put(
  "/:contactId",
  authenticate,
  isValidId,
  validationBody(schemas.addSchema),
  ctrl.updateContact
);

router.patch(
  "/:contactId/favorite",
  authenticate,
  isValidId,
  validationBody(schemas.updFavoriteSchema),
  ctrl.updateContact
);

module.exports = router;
