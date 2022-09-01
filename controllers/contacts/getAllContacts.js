const { Contact } = require("../../models/contacts/Contact");

const getAllContacts = async (req, res, next) => {
  try {
    const { _id: owner } = req.user;
    // Деструктуризація з перейменуванням, аналогічний запис:
    // const {_id} = req.user;
    // const owner = _id;

    const { page, limit, favorite } = req.query;
    const skip = (page - 1) * limit;

    const result = await Contact.find(
      favorite ? { $and: [{ owner }, { favorite }] } : { owner }
    )
      .skip(skip)
      .limit(limit)
      .populate("owner", "email");
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = getAllContacts;
