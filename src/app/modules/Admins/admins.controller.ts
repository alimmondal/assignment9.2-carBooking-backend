import { NextFunction, Request, Response } from 'express'
import httpStatus from 'http-status'
import catchAsync from '../../../shared/catchAsync'
import pick from '../../../shared/pick'
import sendResponse from '../../../shared/sendResponse'
import { userFilterableFields } from '../users/user.constants'
import { adminServices } from './admins.services'

const createAdmin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { password, ...admin } = req.body
    const result = await adminServices.createAdmin(admin, password)
    res.status(200).json({
      status: 'success',
      message: 'Admin created successfully',
      data: result,
    })
  } catch (error) {
    next(error)
  }
}

// const getAllAdmins = async (
//   req: Request,
//   res: Response,
//   next: NextFunction,
// ) => {
//   try {
//     const admins = await adminServices.getAllAdmins()
//     res.status(200).json({
//       status: 'success',
//       message: 'Admins fetched successfully',
//       data: admins.data,
//     })
//   } catch (error) {
//     next(error)
//   }
// }

const getAllAdmins = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, userFilterableFields)
  const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder'])
  const result = await adminServices.getAllAdmins(filters, options)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Admins fetched successfully',
    meta: result.meta,
    data: result.data,
  })
})

const getSingleAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params
    const admin = await adminServices.getSingleAdmin(id)
    res.status(200).json({
      status: 'success',
      message: 'Admin fetched successfully',
      data: admin,
    })
  } catch (error) {
    next(error)
  }
}

const updateAdmin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params
    const { ...adminData } = req.body
    const admin = await adminServices.updateAdmin(id, adminData)
    res.status(200).json({
      status: 'success',
      message: 'Admin updated successfully',
      data: admin,
    })
  } catch (error) {
    next(error)
  }
}

const deleteAdmin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params
    const admin = await adminServices.deleteAdmin(id)
    res.status(200).json({
      status: 'success',
      message: 'Admin deleted successfully',
      data: admin,
    })
  } catch (error) {
    next(error)
  }
}

export const adminController = {
  createAdmin,
  getAllAdmins,
  getSingleAdmin,
  updateAdmin,
  deleteAdmin,
}
