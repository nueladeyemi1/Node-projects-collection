import express from 'express'
import { isAuthenticated, isOwner } from '../middlewares'
import { deleteUser, getAllUsers, updateUser } from '../middlewares/user'

export default (router: express.Router) => {
  router.get('/users', isAuthenticated, getAllUsers)
  router.delete('/user/:id', isAuthenticated, isOwner, deleteUser)
  router.patch('/user/:id', isAuthenticated, isOwner, updateUser)
}
