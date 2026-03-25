import multer from 'multer';

// Multer Memory storage for server-side Sharp Processing
const storage = multer.memoryStorage();

function checkFileType(file: Express.Multer.File, cb: multer.FileFilterCallback) {
  const mimetype = /jpeg|jpg|png|webp/.test(file.mimetype.toLowerCase());
  
  if (mimetype) {
    return cb(null, true);
  } else {
    cb(new Error('Only standard image formats (jpeg, jpg, png, webp) are allowed for conversion'));
  }
}

export const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB individual limit
  fileFilter: (req, file, cb) => {
    checkFileType(file, cb);
  }
});
