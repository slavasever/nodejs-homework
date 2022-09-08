const { RequestError } = require("../../helpers");
const fs = require("fs/promises");
const path = require("path");
const { User } = require("../../models/users/User");
const Jimp = require("jimp");

const avatarsDir = path.join(__dirname, "../../", "public/avatars");

const updateAvatar = async (req, res, next) => {
  try {
    const { _id } = req.user;
    const { path: tempUpload, filename } = req.file;

    const avatar = await Jimp.read(tempUpload);
    await avatar.resize(250, 250).write(tempUpload);

    const [extension] = filename.split(".").reverse();
    const avatarName = `${_id}.${extension}`;
    const resultUpload = path.join(avatarsDir, avatarName);
    await fs.rename(tempUpload, resultUpload);

    await User.findByIdAndUpdate(_id, { avatarURL: resultUpload });

    res.status(200).json(resultUpload);
  } catch (error) {
    fs.unlink(req.file.path);
    next(RequestError(500, error.message));
  }
};

module.exports = updateAvatar;
