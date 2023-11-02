import express from 'express'
import { userController } from './users.controller'

const router = express.Router()

router.post('/create-user', userController.createUser)
router.get('/', userController.getAllUsers)
router.get('/:id', userController.getSingleUSer)
router.patch('/:id', userController.updateUser)
router.delete('/:id', userController.deleteUSer)

export const userRoutes = router
