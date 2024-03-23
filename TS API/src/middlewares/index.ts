import { getUserBySessionToken } from '../controller/userController'
import express from 'express'
import { get, merge } from 'lodash'

export const isAuthenticated = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const tokenSession = req.cookies['NUEL-AES256']

    if (!tokenSession) {
      return res.status(403).json({
        message: "You're not allowed to access",
      })
    }

    const existingUser = await getUserBySessionToken(tokenSession)

    if (!existingUser) {
      return res.status(403).json({
        message: "You're not allowed to access",
      })
    }

    merge(req, { identity: existingUser })

    return next()
  } catch (err) {
    console.log(err)
    res.status(400).json({
      message: 'Error authenticating',
    })
  }
}
