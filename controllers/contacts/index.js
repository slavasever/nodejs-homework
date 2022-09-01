const getAllContacts = require("./getAllContacts");
const getContactById = require("./getContactById");
const deleteContact = require("./deleteContact");
const addContact = require("./addContact");
const updateContact = require("./updateContact");
const updateFavorite = require("./updateFavorite");

module.exports = {
  getAllContacts,
  getContactById,
  deleteContact,
  addContact,
  updateContact,
  updateFavorite,
};
