const fs = require("fs/promises");
const path = require("path");

const { User } = require("../../models/user");
const { HttpError, modifyImage } = require("../../utils");

const avatarDir = path.join(__dirname, "../../", "public", "avatars");
const avatarExtensions = ["jpg", "jpeg", "png", "gif", "bmp", "tiff"];

const updateAvatar = async (req, res) => {
  const { _id } = req.user;
  const { path: tempUpload, originalname } = req.file;

  const fileExtension = originalname.substring(
    originalname.lastIndexOf(".") + 1
  );

  if (!avatarExtensions.includes(fileExtension.toLowerCase())) {
    throw HttpError(
      400,
      `${originalname} includes invalid file extension! Must be: ${avatarExtensions.join(
        ", or "
      )}`
    );
  }

  const resultUpload = path.join(avatarDir, originalname);

  await modifyImage(tempUpload);

  await fs.rename(tempUpload, resultUpload);

  const avatarURL = path.join("avatars", originalname);
  await User.findByIdAndUpdate(_id, { avatarURL });

  res.json({ avatarURL });
};

module.exports = updateAvatar;