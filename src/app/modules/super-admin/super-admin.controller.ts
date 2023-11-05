import { NextFunction, Request, Response } from 'express'
import httpStatus from 'http-status'
import catchAsync from '../../../shared/catchAsync'
import pick from '../../../shared/pick'
import sendResponse from '../../../shared/sendResponse'
import { userFilterableFields } from '../users/user.constants'
import { SuperAdminServices } from './super-admin.services'

const createSuperAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { password, ...superAdmin } = req.body
    const result = await SuperAdminServices.createSuperAdmin(
      superAdmin,
      password,
    )
    res.status(200).json({
      status: 'success',
      message: 'Super admin created successfully',
      data: result,
    })
  } catch (error) {
    next(error)
  }
}

const getAllSuperAdmins = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, userFilterableFields)
  const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder'])
  const result = await SuperAdminServices.getAllSuperAdmins(filters, options)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Admins fetched successfully',
    meta: result.meta,
    data: result.data,
  })
})

const getSingleSuperAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params
    const admin = await SuperAdminServices.getSingleSuperAdmin(id)
    res.status(200).json({
      status: 'success',
      message: 'Admin fetched successfully',
      data: admin,
    })
  } catch (error) {
    next(error)
  }
}

const updateSuperAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params
    const { ...adminData } = req.body
    const admin = await SuperAdminServices.updateSuperAdmin(id, adminData)
    res.status(200).json({
      status: 'success',
      message: 'Admin updated successfully',
      data: admin,
    })
  } catch (error) {
    next(error)
  }
}

const deleteSuperAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params
    const admin = await SuperAdminServices.deleteSuperAdmin(id)
    res.status(200).json({
      status: 'success',
      message: 'Admin deleted successfully',
      data: admin,
    })
  } catch (error) {
    next(error)
  }
}

export const superAdminController = {
  createSuperAdmin,
  getAllSuperAdmins,
  getSingleSuperAdmin,
  updateSuperAdmin,
  deleteSuperAdmin,
}
