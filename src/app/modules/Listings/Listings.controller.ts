import { NextFunction, Request, Response } from 'express'
import httpStatus from 'http-status'
import catchAsync from '../../../shared/catchAsync'
import pick from '../../../shared/pick'
import sendResponse from '../../../shared/sendResponse'
import { listingServices } from './Listings.services'

import { listingFilterableFields } from './Listings.constants'

const createListing = catchAsync(async (req: Request, res: Response) => {
  const { ...listingData } = req.body
  const result = await listingServices.createListing(listingData)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Car listing created successfully',
    data: result,
  })
})

const getAllListings = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, listingFilterableFields)
  const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder'])
  const result = await listingServices.getAllListings(filters, options)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Listings fetched successfully',
    meta: result.meta,
    data: result.data,
  })
})

const getSingleListing = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params
    const service = await listingServices.getSingleListing(id)
    res.status(200).json({
      status: 'success',
      message: 'Service fetched successfully',
      data: service,
    })
  } catch (error) {
    next(error)
  }
}

// const updateCommentInListing = async (
//   req: Request,
//   res: Response,
//   next: NextFunction,
// ) => {
//   try {
//     const id = req.params.id
//     const bookData = req.body.comments
//     const result = await listingServices.updateCommentInListing(id, bookData)
//     res.status(200).json({
//       status: 'success',
//       message: 'Comment updated successfully',
//       data: result,
//     })
//   } catch (error) {
//     next(error)
//   }
// }

const updateListing = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params
    const { ...serviceData } = req.body
    const service = await listingServices.updateListing(id, serviceData)
    res.status(200).json({
      status: 'success',
      message: 'Service updated successfully',
      data: service,
    })
  } catch (error) {
    next(error)
  }
}

const deleteListing = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params
    const service = await listingServices.deleteListing(id)
    res.status(200).json({
      status: 'success',
      message: 'Service deleted successfully',
      data: service,
    })
  } catch (error) {
    next(error)
  }
}

export const ListingController = {
  createListing,
  getAllListings,
  getSingleListing,
  updateListing,
  deleteListing,
  // updateCommentInListing,
}
