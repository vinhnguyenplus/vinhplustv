const fs = require('fs');
const path = require('path');
const multer = require('multer');

const uploadDir = process.env.UPLOAD_DIR || 'uploads';
fs.mkdirSync(uploadDir, { recursive: true });

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, uploadDir),
  filename: (_req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`);
  }
});

module.exports = multer({ storage });
