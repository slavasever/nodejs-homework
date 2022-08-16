const Joi = require("joi");
const API = require("../models/contacts");
const { RequestError } = require("../helpers");

const validationSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
});

const updateContact = async (req, res, next) => {
  try {
    const { error } = validationSchema.validate(req.body);

    if (error) {
      throw RequestError(400, error.message);
    }

    const { contactId } = req.params;
    const updatedContact = await API.updateContact(contactId, req.body);

    if (!updatedContact) {
      throw RequestError(404, "Not found");
    }
    res.status(200).json(updatedContact);
  } catch (error) {
    next(error);
  }
};

module.exports = updateContact;
