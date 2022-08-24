const express = require("express");
const ctrl = require("../../controllers");
const { isValidId, validationBody } = require("../../middlewares");
const { schemas } = require("../../models/contacts/Contact");

const router = express.Router();

router.get("/", ctrl.getAllContacts);

router.get("/:contactId", isValidId, ctrl.getContactById);

router.post("/", validationBody(schemas.addSchema), ctrl.addContact);

router.delete("/:contactId", isValidId, ctrl.deleteContact);

router.put(
  "/:contactId",
  isValidId,
  validationBody(schemas.addSchema),
  ctrl.updateContact
);

router.patch(
  "/:contactId/favorite",
  isValidId,
  validationBody(schemas.updFavoriteSchema),
  ctrl.updateFavorite
);

module.exports = router;
