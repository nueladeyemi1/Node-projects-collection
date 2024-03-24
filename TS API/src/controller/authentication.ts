import express from 'express'
import { authentication, random } from '../helpers'
import { createUser, getUserWithEmail } from './userController'

export const login = async (req: express.Request, res: express.Response) => {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      return res.status(400).json({
        message: 'Invalid email or password',
      })
    }

    const user = await getUserWithEmail(email).select(
      '+authentication.salt +authentication.password'
    )

    if (!user) {
      return res.status(400).json({
        message: 'User does not exist',
      })
    }

    const expectedHash = authentication(user?.authentication?.salt, password)

    if (user.authentication.password !== expectedHash) {
      return res.status(403).json({
        message: 'Authentication error',
      })
    }

    const salt = random()

    user.authentication.tokenSession = authentication(
      salt,
      user?._id.toString()
    )

    await user.save()

    res.cookie('NUEL-AES256', user.authentication.tokenSession, {
      domain: 'localhost',
      path: '/',
      secure: true,
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
