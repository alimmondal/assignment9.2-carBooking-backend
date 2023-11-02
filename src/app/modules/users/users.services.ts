import { Prisma, User } from '@prisma/client'
import bcrypt from 'bcrypt'
import prisma from '../../../shared/prisma'
import { paginationHelpers } from '../../helpers/paginationHelper'
import { IGenericResponse } from '../../interfaces/common'
import { IPaginationOptions } from '../../interfaces/pagination'
import { userSearchableFields } from './user.constants'
import { IUserFilterRequest } from './user.interface'

const createUser = async (user: User, password: string): Promise<any> => {
  const { fullName, email, phoneNumber, role, address } = user
  const saltRounds = 12
  const hashedPassword = await bcrypt.hash(password, saltRounds)

  const result = await prisma.user.create({
    data: {
      fullName,
      email,
      phoneNumber,
      hashedPassword,
      role,
      address,
    },
  })

  return result
}

const getAllUsers = async (
  filters: IUserFilterRequest,
  options: IPaginationOptions,
): Promise<IGenericResponse<User[]>> => {
  const { limit, page, skip } = paginationHelpers.calculatePagination(options)
  const { searchTerm, ...filterData } = filters

  const andConditions = []

  if (searchTerm) {
    andConditions.push({
      OR: userSearchableFields.map(field => ({
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
        return {
          [key]: {
            equals: (filterData as any)[key],
          },
        }
      }),
    })
  }
  const whereConditions: Prisma.UserWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {}

  const result = await prisma.user.findMany({
    where: whereConditions,
    skip,
    take: limit,
    orderBy:
      options.sortBy && options.sortOrder
        ? { [options.sortBy]: options.sortOrder }
        : {
            fullName: 'desc',
          },
  })
  const total = await prisma.user.count({
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

const getSingleUser = async (id: string): Promise<User | null> => {
  const result = await prisma.user.findUnique({
    where: {
      id: id,
    },
  })
  return result
}

const updateUser = async (id: string, payload: User): Promise<User> => {
  const existingRecord = await prisma.user.findUnique({
    where: {
      id: id,
    },
  })

  if (!existingRecord) {
    console.log('user not found')
  }
  const result = await prisma.user.update({
    where: {
      id: id,
    },
    data: payload,
  })
  return result
}

const deleteUser = async (id: string): Promise<User> => {
  const result = await prisma.user.delete({
    where: {
      id: id,
    },
  })
  return result
}

export const userServices = {
  createUser,
  getAllUsers,
  getSingleUser,
  updateUser,
  deleteUser,
}
