import { SuperAdmin, Prisma } from '@prisma/client'
import bcrypt from 'bcrypt'
import prisma from '../../../shared/prisma'
import { paginationHelpers } from '../../helpers/paginationHelper'
import { IGenericResponse } from '../../interfaces/common'
import { IPaginationOptions } from '../../interfaces/pagination'
import { userSearchableFields } from '../users/user.constants'
import { IUserFilterRequest } from '../users/user.interface'

const createSuperAdmin = async (
  admin: SuperAdmin,
  password: any,
): Promise<SuperAdmin> => {
  const { fullName, email, phoneNumber, role } = admin
  const saltRounds = 12
  const hashedPassword = await bcrypt.hash(password, saltRounds)
  const result = await prisma.superAdmin.create({
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

const getAllSuperAdmins = async (
  filters: IUserFilterRequest,
  options: IPaginationOptions,
): Promise<IGenericResponse<SuperAdmin[]>> => {
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
  const whereConditions: Prisma.SuperAdminWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {}

  const result = await prisma.superAdmin.findMany({
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
  const total = await prisma.superAdmin.count({
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

const getSingleSuperAdmin = async (id: string): Promise<SuperAdmin | null> => {
  const result = await prisma.superAdmin.findUnique({
    where: {
      id: id,
    },
  })
  return result
}

const updateSuperAdmin = async (
  id: string,
  admin: SuperAdmin,
): Promise<SuperAdmin> => {
  const result = await prisma.superAdmin.update({
    where: {
      id: id,
    },
    data: admin,
  })
  return result
}

const deleteSuperAdmin = async (id: string): Promise<SuperAdmin> => {
  const result = await prisma.superAdmin.delete({
    where: {
      id: id,
    },
  })
  return result
}

export const SuperAdminServices = {
  createSuperAdmin,
  getAllSuperAdmins,
  getSingleSuperAdmin,
  updateSuperAdmin,
  deleteSuperAdmin,
}
