const express = require('express')
const { uploadKitsImages } = require('../controllers/itemController')

const router = express.Router()

// router.get('/', (req, res) => {
//   res.status(200).json({
//     status: 'success',
//     message: 'It is working',
//   })
// })

router.post('/', uploadKitsImages, (req, res) => {
  console.log(req.files)
  res.status(200).json({
    message: 'file submitted r',
    file: req.files,
  })
})

module.exports = router
