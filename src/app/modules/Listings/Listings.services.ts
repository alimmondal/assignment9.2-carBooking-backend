import { Listing, Prisma } from '@prisma/client'
import prisma from '../../../shared/prisma'
import { paginationHelpers } from '../../helpers/paginationHelper'
import { IGenericResponse } from '../../interfaces/common'
import { IPaginationOptions } from '../../interfaces/pagination'

import {
  listingRelationalFields,
  listingRelationalFieldsMapper,
  listingSearchableFields,
} from './Listings.constants'
import { ICarListFilterRequest } from './Listings.interface'

const createListing = async (payload: Listing): Promise<Listing> => {
  payload.comments = JSON.stringify(payload.comments)

  const adjustedPayload = {
    ...payload,
    comments: {
      value: payload.comments,
    },
  }
  const result = await prisma.listing.create({
    data: adjustedPayload,
  })
  return result
}

const getAllListings = async (
  filters: ICarListFilterRequest,
  options: IPaginationOptions,
): Promise<IGenericResponse<Listing[]>> => {
  const { limit, page, skip } = paginationHelpers.calculatePagination(options)
  const { searchTerm, ...filterData } = filters

  const andConditions = []

  if (searchTerm) {
    andConditions.push({
      OR: listingSearchableFields.map(field => ({
        [field]: {
          contains: searchTerm,
          mode: 'insensitive',
        },
      })),
    })
  }

  if (Object.keys(filterData).length > 0) {
    andConditions.push({
      AND: Object.keys(filterData).map(key => {
        if (listingRelationalFields.includes(key)) {
          return {
            [listingRelationalFieldsMapper[key]]: {
              id: (filterData as any)[key],
            },
          }
        } else {
          return {
            [key]: {
              equals: (filterData as any)[key],
            },
          }
        }
      }),
    })
  }

  const whereConditions: Prisma.ListingWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {}

  const result = await prisma.listing.findMany({
    where: whereConditions,
    skip,
    take: limit,
    orderBy:
      options.sortBy && options.sortOrder
        ? { [options.sortBy]: options.sortOrder }
        : {
            name: 'desc',
          },
  })
  const total = await prisma.listing.count({
    where: whereConditions,
  })

  return {
    meta: {
      total,
      page,
      limit,
    },
    data: result,
  }
}

const getSingleListing = async (id: string): Promise<Listing | null> => {
  const result = await prisma.listing.findUnique({
    where: {
      id: id,
    },
  })
  return result
}

const updateComment = async (
  appointmentId: string,
  payload: Listing,
): Promise<any> => {
  payload.comments = JSON.stringify(payload.comments)

  // const adjustedPayload = {
  //   ...payload,
  //   comments: {
  //     value: payload.comments,
  //   },
  // }

  const appointment = await prisma.listing.findUnique({
    where: {
      id: appointmentId,
    },
  })

  if (!appointment) {
    throw new Error('Appointment does not exist')
  }

  const updatedComment = await prisma.listing.update({
    where: {
      id: appointmentId,
    },
    data: {
      comments: payload,
    },
  })

  return updatedComment
}

const updateListing = async (
  id: string,
  payload: Listing,
): Promise<Listing> => {
  payload.comments = JSON.stringify(payload.comments)

  const adjustedPayload = {
    ...payload,
    comments: {
      value: payload.comments,
    },
  }
  const result = await prisma.listing.update({
    where: {
      id: id,
    },
    data: adjustedPayload,
  })
  return result
}

const deleteListing = async (id: string): Promise<Listing> => {
  const result = await prisma.listing.delete({
    where: {
      id: id,
    },
  })
  return result
}

export const listingServices = {
  createListing,
  getAllListings,
  getSingleListing,
  updateComment,
  updateListing,
  deleteListing,
}
