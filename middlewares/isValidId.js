const { isValidObjectId } = require("mongoose");

const { RequestError } = require("../helpers");

const isValidId = (req, _, next) => {
  const { contactId } = req.params;

  const isCorrectId = isValidObjectId(contactId);

  if (!isCorrectId) {
    next(RequestError(400, `Format of id: ${contactId} is incorrect`));
  }
  next();
};

module.exports = isValidId;
