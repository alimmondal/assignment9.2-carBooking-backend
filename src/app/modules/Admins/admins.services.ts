import { Admin, Prisma } from '@prisma/client'
import bcrypt from 'bcrypt'
import prisma from '../../../shared/prisma'
import { userSearchableFields } from '../users/user.constants'
import { IGenericResponse } from '../../interfaces/common'
import { IUserFilterRequest } from '../users/user.interface'
import { IPaginationOptions } from '../../interfaces/pagination'
import { paginationHelpers } from '../../helpers/paginationHelper'

const createAdmin = async (admin: Admin, password: any): Promise<Admin> => {
  const { fullName, email, phoneNumber, role } = admin
  const saltRounds = 12
  const hashedPassword = await bcrypt.hash(password, saltRounds)
  const result = await prisma.admin.create({
    data: {
      fullName,
      email,
      phoneNumber,
      hashedPassword,
      role,
    },
  })
  return result
}

const getAllAdmins = async (
  filters: IUserFilterRequest,
  options: IPaginationOptions,
): Promise<IGenericResponse<Admin[]>> => {
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
  const whereConditions: Prisma.AdminWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {}

  const result = await prisma.admin.findMany({
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
  const total = await prisma.admin.count({
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

const getSingleAdmin = async (id: string): Promise<Admin | null> => {
  const result = await prisma.admin.findUnique({
    where: {
      id: id,
    },
  })
  return result
}

const updateAdmin = async (id: string, admin: Admin): Promise<Admin> => {
  const result = await prisma.admin.update({
    where: {
      id: id,
    },
    data: admin,
  })
  return result
}

const deleteAdmin = async (id: string): Promise<Admin> => {
  const result = await prisma.admin.delete({
    where: {
      id: id,
    },
  })
  return result
}

export const adminServices = {
  createAdmin,
  getAllAdmins,
  getSingleAdmin,
  updateAdmin,
  deleteAdmin,
}
