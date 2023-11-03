import { Prisma, Reviews } from '@prisma/client'
import { paginationHelpers } from '../../../helpers/paginationHelper'

import prisma from '../../../shared/prisma'
import { IGenericResponse } from '../../interfaces/common'
import { IPaginationOptions } from '../../interfaces/pagination'
import {
  reviewRatingRelationalFields,
  reviewRatingRelationalFieldsMapper,
  reviewRatingSearchableFields,
} from './reviewRating.constants'
import { IReviewRatingFilterRequest } from './reviewRating.interface'

const insertIntoDB = async (payload: Reviews): Promise<Reviews> => {
  const result = await prisma.reviews.create({
    data: payload,
  })
  return result
}

const getAllFromDB = async (
  filters: IReviewRatingFilterRequest,
  options: IPaginationOptions,
): Promise<IGenericResponse<Reviews[]>> => {
  const { limit, page, skip } = paginationHelpers.calculatePagination(options)
  const { searchTerm, ...filterData } = filters

  const andConditions = []

  if (searchTerm) {
    andConditions.push({
      OR: reviewRatingSearchableFields.map(field => ({
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
        if (reviewRatingRelationalFields.includes(key)) {
          return {
            [reviewRatingRelationalFieldsMapper[key]]: {
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

  const whereConditions: Prisma.ReviewsWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {}

  const result = await prisma.reviews.findMany({
    // include: {
    //   listing: true,
    //   book: true,
    // },
    where: whereConditions,
    skip,
    take: limit,
    orderBy:
      options.sortBy && options.sortOrder
        ? { [options.sortBy]: options.sortOrder }
        : {
            id: 'desc',
          },
  })
  const total = await prisma.reviews.count({
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

const getByIdFromDB = async (id: string): Promise<Reviews | null> => {
  const result = await prisma.reviews.findUnique({
    where: {
      id,
    },
    // include: {
    //   user: true,
    //   book: true,
    // },
  })
  return result
}

const updateIntoDB = async (
  id: string,
  payload: Partial<Reviews>,
): Promise<Reviews> => {
  const result = await prisma.reviews.update({
    where: {
      id,
    },
    data: payload,
    // include: {
    //   user: true,
    //   book: true,
    // },
  })
  return result
}

const deleteFromDB = async (id: string): Promise<Reviews> => {
  const result = await prisma.reviews.delete({
    where: {
      id,
    },
    // include: {
    //   user: true,
    //   book: true,
    // },
  })
  return result
}

export const ReviewAndRatingService = {
  insertIntoDB,
  getAllFromDB,
  getByIdFromDB,
  updateIntoDB,
  deleteFromDB,
}
