const { Contact } = require("../models/contacts/Contact");
const { RequestError } = require("../helpers");

const updateFavorite = async (req, res, next) => {
  try {
    const { contactId } = req.params;

    const updatedContact = await Contact.findByIdAndUpdate(
      contactId,
      req.body,
      { new: true }
    );

    if (!updatedContact) {
      throw RequestError(404, `Contact with ID:${contactId} not found`);
    }

    res.status(200).json(updatedContact);
  } catch (error) {
    next(error);
  }
};

module.exports = updateFavorite;
