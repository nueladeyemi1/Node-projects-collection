import express, { response } from 'express'
import { authentication, random } from '../helpers'
import { createUser, getUserWithEmail } from './userController'

export const register = async (req: express.Request, res: express.Response) => {
  try {
    const { email, password, username } = req.body

    if (!email || !password || !username) {
      return res.status(400).json({ status: 'Bad Request' })
    }

    const existingUser = getUserWithEmail(email)

    if (!existingUser) {
      res.status(404).json({ message: 'User already exist' })
    }

    const salt = random()

    const user = await createUser({
      email,
      username,
      authentication: {
        salt,
        password: authentication(salt, password),
      },
    })

    return res.status(200).json({
      status: 'success',
      data: user,
    })
  } catch (err) {
    console.log(err)
    return res.status(404).json({
      message: err.message,
    })
  }
}
