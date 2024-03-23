import {
  deleteUserById,
  getUsers,
  updateUserById,
} from '../controller/userController'
import express from 'express'

export const getAllUsers = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const users = await getUsers()

    res.status(200).json({
      status: 'success',
      data: users,
    })
  } catch (err) {
    console.log(err)
    return res.status(404).json({
      status: 'failed',
      message: 'User not found',
    })
  }
}

export const deleteUser = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { id } = req.params

    const deletedUser = await deleteUserById(id)

    res.status(200).json({
      status: 'user successfully deleted',
      deletedUser: deletedUser,
    })
  } catch (err) {
    console.log(err)
    return res.status(404).json({
      status: 'failed',
      message: 'User not found',
    })
  }
}

export const updateUser = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { id } = req.params
    const { username } = req.body

    if (!username) {
      return res.status(400).json({
        status: 'Bad Request',
      })
    }

    const user = await updateUserById(id, username)

    res.status(200).json({
      status: 'user successfully deleted',
      data: user,
    })
  } catch (err) {
    console.log(err)
    return res.status(404).json({
      status: 'failed',
      message: 'User not found',
    })
  }
}
