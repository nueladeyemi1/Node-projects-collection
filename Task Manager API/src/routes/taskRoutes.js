const express = require('express')
// const User = require('../model/Task')

const router = express.Router()

router.get('/', (req, res) => {
  res.send('Task route working')
})

module.exports = router
