const Joi = require("joi");
const API = require("../models/contacts");
const { RequestError } = require("../helpers");

const validationSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
});

const addContact = async (req, res, next) => {
  try {
    const { error } = validationSchema.validate(req.body);

    if (error) {
      throw RequestError(400, error.message);
    }
    const newContact = await API.addContact(req.body);
    res.status(201).json(newContact);
  } catch (error) {
    next(error);
  }
};

module.exports = addContact;
