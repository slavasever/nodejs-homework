const API = require("../models/contacts");

const getAllContacts = async (req, res, next) => {
  try {
    const contacts = await API.listContacts();
    res.status(200).json(contacts);
  } catch (error) {
    next(error);
  }
};

module.exports = getAllContacts;
