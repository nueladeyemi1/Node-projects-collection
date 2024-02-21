const express = require('express')
const { uploadKitsImages } = require('../controllers/itemController')
const { auth } = require('../middlewares/auth.js')
const Item = require('../models/Item')

const router = express.Router()

// router.get('/', (req, res) => {
//   res.status(200).json({
//     status: 'success',
//     message: 'It is working',
//   })
// })

router.post('/', auth, uploadKitsImages, async (req, res) => {
  console.log(req.files.images)
  const item = await Item.create({
    images: req.files.images,
    ...req.body,
    owner: req.user,
  }).select('-password')

  res.status(200).json({
    message: 'item submitted successfully',
    data: item,
  })
})

module.exports = router
