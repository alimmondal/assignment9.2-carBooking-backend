import bcrypt from 'bcrypt'
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Secret } from 'jsonwebtoken'
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

  // const doctor = await prisma.doctor.findUnique({
  //   where: { email },
  // })
  const user = await prisma.user.findUnique({
    where: { email },
  })

  if (!admin && !user) {
    throw new Error('User does not exist')
  }

  if (admin || user) {
    isUserExist = admin || user
  }

  // if (isUserExist && isUserExist.password !== password) {
  //   throw new Error('Password is incorrect')
  // }

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
  return { accessToken }
}

const refreshToken = async (token: string) => {
  if (!token) {
    throw new Error('Token is required')
  }

  const decodedToken = jwtHelpers.decodeToken(token)
  const { email, role, phoneNumber, fullName, id } = decodedToken
  if (!email || !role || !phoneNumber || !fullName || !id) {
    throw new Error('Invalid token')
  }

  const admin = await prisma.admin.findUnique({
    where: {
      email,
    },
  })

  // const doctor = await prisma.doctor.findUnique({
  //   where: { email },
  // })
  const user = await prisma.user.findUnique({
    where: { email },
  })

  if (!admin && !user) {
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
    process.env.JWT_SECRET as Secret,
    process.env.EXPIRES_IN as string,
  )
  return {
    accessToken: newAccessToken,
  }
}
export const authServices = { loginUser, refreshToken }
