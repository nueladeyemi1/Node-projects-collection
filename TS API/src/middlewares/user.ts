import { getUsers } from '../controller/userController'
import express from 'express'

export const getAllUsers = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const users = await getUsers()
  } catch (err) {
    console.log(err)
    return res.status(404).json({
      status: 'failed',
      message: 'User not found',
    })
  }
}
