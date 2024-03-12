const { User } = require('../../app')

exports.createUser = async function(req, res) {
  try {
    const user = await User.create(req.body)

    res.status(200).json({
      status: 'success',
      message: 'user created successfully',
      data: user,
    })
  } catch (err) {
    res.status(404).json({
      status: 'failed',
      message: 'Error creating user',
      stack: err.message,
    })
  }
}
