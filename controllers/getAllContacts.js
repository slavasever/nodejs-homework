const { Contact } = require("../models/contacts/Contact");

const getAllContacts = async (_, res, next) => {
  try {
    const result = await Contact.find();
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = getAllContacts;
