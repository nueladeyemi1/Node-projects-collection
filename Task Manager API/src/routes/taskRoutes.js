const express = require('express')
const Task = require('../models/Task')
const auth = require('../middlewares/auth')
const {
  createTask,
  getTasks,
  getTaskById,
  updateTaskById,
  deleteTask,
} = require('../controllers/taskControllers')
// const User = require('../model/Task')

const router = express.Router()

router.get('/test', auth, (req, res) => {
  res.json({
    message: 'Route is working',
    user: req.user,
  })
})

//Creating a new task, for AUTHENTICATED USERS

router
  .route('/')
  .post(auth, createTask)
  .get(auth, getTasks)

// router.post('/', auth, createTask)

router
  .route('/:id')
  .get(auth, getTaskById)
  .patch(auth, updateTaskById)
  .delete(auth, deleteTask)

//GET USER TASKS
// router.get('/', auth, getTasks)

//GET TASK BY ID

// router.get('/:id', auth, getTaskById)/

//UPDATE A TASK

// router.patch('/:id', auth, updateTaskById)

//DELETE TASK

// router.delete('/:id', auth, deleteTask)

module.exports = router
