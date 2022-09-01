const { Contact } = require("../../models/contacts/Contact");
const { RequestError } = require("../../helpers");

const deleteContact = async (req, res, next) => {
  try {
    const { _id: owner } = req.user;
    // Деструктуризація з перейменуванням, аналогічний запис:
    // const {_id} = req.user;
    // const owner = _id;
    const { contactId: _id } = req.params;

    const deletedContact = await Contact.findOneAndRemove({
      $and: [{ owner }, { _id }],
    });

    if (!deletedContact) {
      throw RequestError(404, `Contact with ID:${_id} not found`);
    }
    res.status(200).json({ message: "Contact deleted" });
  } catch (error) {
    next(error);
  }
};

module.exports = deleteContact;
