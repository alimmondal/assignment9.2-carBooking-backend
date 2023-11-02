import { NextFunction, Request, Response } from 'express'
import { userServices } from './users.services'
import sendResponse from '../../../shared/sendResponse'
import pick from '../../../shared/pick'
import catchAsync from '../../../shared/catchAsync'
import { userFilterableFields } from './user.constants'
import httpStatus from 'http-status'

const createUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { password, ...user } = req.body
    const result = await userServices.createUser(user, password)
    res.status(200).json({
      status: 'success',
      message: 'User created successfully',
      data: result,
    })
  } catch (error) {
    next(error)
  }
}

// const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
//   try {
//     const patients = await userServices.getAllUsers()
//     res.status(200).json({
//       status: 'success',
//       message: 'Users fetched successfully',
//       data: patients.data,
//     })
//   } catch (error) {
//     next(error)
//   }
// }

const getAllUsers = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, userFilterableFields)
  const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder'])
  const result = await userServices.getAllUsers(filters, options)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Users fetched successfully',
    meta: result.meta,
    data: result.data,
  })
})

const getSingleUSer = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params
    const patient = await userServices.getSingleUser(id)
    res.status(200).json({
      status: 'success',
      message: 'User fetched successfully',
      data: patient,
    })
  } catch (error) {
    next(error)
  }
}

const updateUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params
    const { ...userData } = req.body
    const patient = await userServices.updateUser(id, userData)
    res.status(200).json({
      status: 'success',
      message: 'User updated successfully',
      data: patient,
    })
  } catch (error) {
    next(error)
  }
}

const deleteUSer = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params
    const patient = await userServices.deleteUser(id)
    res.status(200).json({
      status: 'success',
      message: 'User deleted successfully',
      data: patient,
    })
  } catch (error) {
    next(error)
  }
}

export const userController = {
  createUser,
  getAllUsers,
  getSingleUSer,
  updateUser,
  deleteUSer,
}
