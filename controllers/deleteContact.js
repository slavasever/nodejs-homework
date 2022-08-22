const { Contact } = require("../models/contacts/Contact");
const { RequestError } = require("../helpers");

const deleteContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const deletedContact = await Contact.findByIdAndRemove(contactId);

    if (!deletedContact) {
      throw RequestError(404, `Contact with ID:${contactId} not found`);
    }
    res.status(200).json({ message: "Contact deleted" });
  } catch (error) {
    next(error);
  }
};

module.exports = deleteContact;
