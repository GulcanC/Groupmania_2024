const multer = require("multer");

// mime types,
const MIME_TYPES = {
  "image/jpg": "jpg",
  "image/jpeg": "jpeg",
  "image/png": "png",
  "image/webp": "webp",
  "image/gif": "gif",
};

// create a multer config object
// the diskStorage() function configures the path and filename for incoming files
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    // it gives you the details of your image, fieldname, originalname, mimetype
    console.log(file);
    // call destination, first argument is null means there is no error, second argument the images folder
    callback(null, "images");
  },
  filename: (req, file, callback) => {
    // we will manage the new name for the file, access original name
    // split() will create the different words of the file name, join() to join this array in a single string
    const name = file.originalname.split(" ").join("_");
    const extension = MIME_TYPES[file.mimetype];
    callback(null, name + Date.now() + "." + extension);
  },
});

// here 'file' is fieldname and you will use it in the frontend. So be careful to use the correct name in frontend
module.exports = multer({ storage: storage }).single("file");