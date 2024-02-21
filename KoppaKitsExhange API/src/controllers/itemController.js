const Item = require('../models/Item')
const multer = require('multer')
// const default1 = require('../public/img/items/default.jpeg')
// const sharp = require('sharp')

// RETURNING BUFFER
// const multerstorage = multer.memoryStorage()

// HANDLING FILE

const multerstorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './public/img/items')
  },
  filename: (req, file, cb) => {
    // const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9)
    // cb(null, file.fieldname + '-' + uniqueSuffix)
    cb(null, Date.now() + '--' + file.originalname)
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

// ----- HAVING ISSUE HANDLING RESIZE OF FILES -----

// exports.resizeKitImages = async (req, res, next) => {
//   if (!req.files.images) return next()

//   req.body.images = []

//   try {
//     await Promise.all(
//       req.body.images.map(async (file, i) => {
//         const filename = `kits-${req.params.id}-${Date.now()}-${i + 1}.jpeg`

//         await sharp(file.buffer)
//           .resize(1800, 1200)
//           .toFormat('jpeg')
//           .jpeg({ quality: 90 })
//           .toFile(`public/img/images/${filename}`)

//         req.body.images.push(filename)
//       })
//     )
//   } catch (err) {
//     throw new Error(err)
//   }

//   next()
// }
