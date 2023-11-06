/* eslint-disable @typescript-eslint/no-unused-vars */
import bcrypt from 'bcrypt'
import { Secret } from 'jsonwebtoken'
import config from '../../../config'
import prisma from '../../../shared/prisma'
import { jwtHelpers } from '../../helpers/jwtHelper'

const loginUser = async (payload: any): Promise<any> => {
  const { email, password }: { email: string; password: string } = payload

  let isUserExist: any
  const admin = await prisma.admin.findUnique({
    where: {
      email,
    },
  })

  const superAdmin = await prisma.superAdmin.findUnique({
    where: { email },
  })
  const user = await prisma.user.findUnique({
    where: { email },
  })

  if (!admin && !user && !superAdmin) {
    throw new Error('User does not exist')
  }

  if (admin || user || superAdmin) {
    isUserExist = admin || user || superAdmin
  }

  const passwordMatches = await bcrypt.compare(
    password,
    isUserExist.hashedPassword,
  )

  if (!passwordMatches) {
    throw new Error('Password is incorrect')
  }

  const payloadData = {
    id: isUserExist!.id,
    email: isUserExist!.email,
    role: isUserExist!.role,
    phoneNumber: isUserExist!.phoneNumber,
    fullName: isUserExist!.fullName,
  }

  //   create token
  const accessToken = jwtHelpers.createToken(
    payloadData,
    process.env.JWT_SECRET as Secret,
    process.env.EXPIRES_IN as string,
  )
  //   create token
  const refreshToken = jwtHelpers.createToken(
    payloadData,
    config.jwt.refresh_secret as Secret,
    config.jwt.refresh_expires_in as string,
  )
  return { accessToken, refreshToken }
}

const refreshToken = async (token: string) => {
  // if (!token) {
  //   throw new Error('Token is required')
  // }

  const verifiedToken = jwtHelpers.verifyToken(
    token,
    config.jwt.refresh_secret as Secret,
  )
  const { email, role, phoneNumber, fullName, id } = verifiedToken
  if (!email || !role || !phoneNumber || !fullName || !id) {
    throw new Error('Invalid token')
  }

  const admin = await prisma.admin.findUnique({
    where: {
      email,
    },
  })

  const superAdmin = await prisma.superAdmin.findUnique({
    where: { email },
  })
  const user = await prisma.user.findUnique({
    where: { email },
  })

  if (!admin && !user && !superAdmin) {
    throw new Error('User does not exist')
  }
  const payloadData = {
    id: id,
    email: email,
    role: role,
    phoneNumber: phoneNumber,
    fullName: fullName,
  }
  const newAccessToken = jwtHelpers.createToken(
    payloadData,
    config.jwt.secret as Secret,
    config.jwt.expires_in as string,
  )
  return {
    accessToken: newAccessToken,
  }
}
export const authServices = { loginUser, refreshToken }
