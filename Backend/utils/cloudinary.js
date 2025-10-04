const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");

// Configure Cloudinary avec tes infos
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Multer storage pour uploader directement sur Cloudinary
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "products", // dossier sur Cloudinary
    allowed_formats: ["jpg", "jpeg", "png"],
  },
});

module.exports = {
  cloudinary,
  storage,
};
