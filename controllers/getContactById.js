const API = require("../models/contacts");
const { RequestError } = require("../helpers");

const getContactById = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contact = await API.getContactById(contactId);

    if (!contact) {
      throw RequestError(404, `Contact with ID:${contactId} not found`);
    }
    res.status(200).json(contact);
  } catch (error) {
    next(error);
  }
};

module.exports = getContactById;
