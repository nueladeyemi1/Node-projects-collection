const Item = require('../models/Item')
const multer = require('multer')

// RETURNING BUFFER
// const multerstorage = multer.memoryStorage()

// HANDLING FILE

const multerstorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './public/img/items')
  },
  filename: (req, file, cb) => {
    cb(
      null,
      Date.now() + '--' + Math.round(Math.random() * 1e4) + file.originalname
    )
  },
})

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true)
  } else {
    throw new Error('Invalid file format')
  }
}

const upload = multer({
  storage: multerstorage,
  fileFilter: multerFilter,
})

exports.uploadKitsImages = upload.fields([{ name: 'images', maxCount: 8 }])
