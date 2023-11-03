import { Prisma, ReviewAndRating } from '@prisma/client';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import prisma from '../../../shared/prisma';
import {
  reviewRatingRelationalFields,
  reviewRatingRelationalFieldsMapper,
  reviewRatingSearchableFields,
} from './reviewRating.constants';
import { IReviewRatingFilterRequest } from './reviewRating.interface';

const insertIntoDB = async (
  data: ReviewAndRating
): Promise<ReviewAndRating> => {
  const result = await prisma.reviewAndRating.create({
    data,
    include: {
      user: true,
      book: true,
    },
  });
  return result;
};

const getAllFromDB = async (
  filters: IReviewRatingFilterRequest,
  options: IPaginationOptions
): Promise<IGenericResponse<ReviewAndRating[]>> => {
  const { limit, page, skip } = paginationHelpers.calculatePagination(options);
  const { searchTerm, ...filterData } = filters;

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      OR: reviewRatingSearchableFields.map(field => ({
        [field]: {
          contains: searchTerm,
          mode: 'insensitive',
        },
      })),
    });
  }

  if (Object.keys(filterData).length > 0) {
    andConditions.push({
      AND: Object.keys(filterData).map(key => {
        if (reviewRatingRelationalFields.includes(key)) {
          return {
            [reviewRatingRelationalFieldsMapper[key]]: {
              id: (filterData as any)[key],
            },
          };
        } else {
          return {
            [key]: {
              equals: (filterData as any)[key],
            },
          };
        }
      }),
    });
  }

  const whereConditions: Prisma.ReviewAndRatingWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.reviewAndRating.findMany({
    include: {
      user: true,
      book: true,
    },
    where: whereConditions,
    skip,
    take: limit,
    orderBy:
      options.sortBy && options.sortOrder
        ? { [options.sortBy]: options.sortOrder }
        : {
            id: 'desc',
          },
  });
  const total = await prisma.reviewAndRating.count({
    where: whereConditions,
  });

  return {
    meta: {
      total,
      page,
      limit,
    },
    data: result,
  };
};

const getByIdFromDB = async (id: string): Promise<ReviewAndRating | null> => {
  const result = await prisma.reviewAndRating.findUnique({
    where: {
      id,
    },
    include: {
      user: true,
      book: true,
    },
  });
  return result;
};

const updateIntoDB = async (
  id: string,
  payload: Partial<ReviewAndRating>
): Promise<ReviewAndRating> => {
  const result = await prisma.reviewAndRating.update({
    where: {
      id,
    },
    data: payload,
    include: {
      user: true,
      book: true,
    },
  });
  return result;
};

const deleteFromDB = async (id: string): Promise<ReviewAndRating> => {
  const result = await prisma.reviewAndRating.delete({
    where: {
      id,
    },
    include: {
      user: true,
      book: true,
    },
  });
  return result;
};

export const ReviewAndRatingService = {
  insertIntoDB,
  getAllFromDB,
  getByIdFromDB,
  updateIntoDB,
  deleteFromDB,
};
