const { RequestError } = require("../helpers");
const jwt = require("jsonwebtoken");
const SECRET_KEY = process.env.SECRET_KEY;
const { User } = require("../models/users/User");

const authenticate = async (req, res, next) => {
  const { authorization = "" } = req.headers;
  const [bearer, token] = authorization.split(" ");

  if (bearer !== "Bearer") {
    next(RequestError(401, "Unauthorized"));
  }

  try {
    jwt.verify(token, SECRET_KEY);
    // jwt.verify викине помилку, якщо токен не валідний
    const user = await User.findOne({ token });

    if (!user) {
      throw RequestError(401, "Unauthorized");
    }
    req.user = user;
    next();
  } catch (error) {
    next(RequestError(401, error.message));
  }
};

module.exports = authenticate;
