const { Contact } = require("../../models/contacts/Contact");

const addContact = async (req, res, next) => {
  try {
    const { _id: owner } = req.user;
    // Деструктуризація з перейменуванням, аналогічний запис:
    // const {_id} = req.user;
    // const owner = _id;

    const newContact = await Contact.create({ ...req.body, owner });
    res.status(201).json(newContact);
  } catch (error) {
    next(error);
  }
};

module.exports = addContact;
