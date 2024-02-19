const Task = require('../models/Task')

exports.createTask = async (req, res) => {
  try {
    const task = await Task.create({
      ...req.body,
      owner: req.user._id,
    })

    res.status(200).json({
      status: 'success',
      data: task,
    })
  } catch (err) {
    res.status(500).json({ message: err })
  }
}

exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({
      owner: req.user._id,
    }).populate('owner', ['name', 'email'])

    res.status(200).json({
      status: 'success',
      count: tasks.length,
      data: tasks,
    })
  } catch (err) {
    res.status(500).json({ message: err })
  }
}

exports.getTaskById = async (req, res) => {
  try {
    const task = await Task.findOne({
      _id: req.params.id,
      owner: req.user._id,
    }).populate('owner')

    if (!task) {
      return res.status(404).json({
        message: 'Task not found',
      })
    }

    res.status(200).json({
      status: 'success',
      data: task,
    })
  } catch (err) {
    res.status(500).json({ message: err })
  }
}

exports.updateTaskById = async (req, res) => {
  const taskId = req.params.id
  const updates = Object.keys(req.body)
  const allowUpdates = ['description', 'completed']

  const isValidOperation = updates.every((update) =>
    allowUpdates.includes(update)
  )

  if (!isValidOperation) {
    res.status(400).json({
      error: 'Invalid Updates value',
    })
  }

  try {
    const task = await Task.findByIdAndUpdate(taskId, req.body, {
      new: true,
      runValidators: true,
    })

    if (!task) {
      return res.status(404).json({
        message: 'Task not found',
      })
    }

    res.status(200).json({
      status: 'Task updated successfully',
      data: task,
    })
  } catch (err) {
    res.status(500).json({ message: err })
  }
}

exports.deleteTask = async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({
      _id: req.params.id,
      owner: req.user._id,
    })

    if (!task) {
      return res.status(404).json({
        message: 'Task not found',
      })
    }

    res.status(200).json({
      status: 'Task Successfully deleted',
    })
  } catch (err) {
    res.status(500).json({ message: err })
  }
}
