const express = require('express')
const Task = require('../model/Task')
// const User = require('../model/Task')

const router = express.Router()

router.get('/', (req, res) => {
  res.send('Task route working')
})

router.get('/tasks', async (req, res) => {
  try {
    const tasks = await Task.find({})

    res.status(200).json({
      status: 'success',
      data: tasks,
    })
  } catch (err) {
    res.status(500).json({ message: err })
  }
})

module.exports = router
