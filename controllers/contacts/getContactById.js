const { Contact } = require("../../models/contacts/Contact");
const { RequestError } = require("../../helpers");

const getContactById = async (req, res, next) => {
  try {
    const { _id: owner } = req.user;
    // Деструктуризація з перейменуванням, аналогічний запис:
    // const {_id} = req.user;
    // const owner = _id;
    const { contactId: _id } = req.params;

    const contact = await Contact.findOne({
      $and: [{ owner }, { _id }],
    }).populate("owner", "email");

    if (!contact) {
      throw RequestError(404, `Contact with ID:${_id} not found`);
    }
    res.status(200).json(contact);
  } catch (error) {
    next(error);
  }
};

module.exports = getContactById;
