const { Contact } = require("../../models/contacts/Contact");
const { RequestError } = require("../../helpers");

const updateFavorite = async (req, res, next) => {
  try {
    const { _id: owner } = req.user;
    // Деструктуризація з перейменуванням, аналогічний запис:
    // const {_id} = req.user;
    // const owner = _id;
    const { contactId: _id } = req.params;

    const updatedContact = await Contact.findOneAndUpdate(
      {
        $and: [{ owner }, { _id }],
      },
      req.body,
      {
        new: true,
      }
    );

    if (!updatedContact) {
      throw RequestError(404, `Contact with ID:${_id} not found`);
    }

    res.status(200).json(updatedContact);
  } catch (error) {
    next(error);
  }
};

module.exports = updateFavorite;
