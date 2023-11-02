import { Reservation } from '@prisma/client'
import prisma from '../../../shared/prisma'

const bookAppointment = async (payload: any): Promise<Reservation> => {
  const { startDate, endDate, userId, listingId } = payload
  const appointment = await prisma.reservation.create({
    data: {
      startDate,
      endDate,
      userId,
      listingId,
      status: 'pending',
    },
  })

  return appointment
}

const cancelAppointment = async (appointmentId: string): Promise<any> => {
  const appointment = await prisma.reservation.findUnique({
    where: {
      id: appointmentId,
    },
  })

  if (!appointment) {
    throw new Error('Appointment does not exist')
  }

  if (appointment.status === 'cancelled') {
    throw new Error('Appointment has already been cancelled')
  }

  if (appointment.status === 'finished') {
    throw new Error('Appointment has already been completed')
  }

  const appointmentToCancel = await prisma.reservation.update({
    where: {
      id: appointmentId,
    },
    data: {
      status: 'cancelled',
    },
  })

  return appointmentToCancel
}

// const startAppointment = async (appointmentId: string): Promise<any> => {
//   const appointment = await prisma.reservation.findUnique({
//     where: {
//       id: appointmentId,
//     },
//   })

//   if (!appointment) {
//     throw new Error('Appointment does not exist')
//   }

//   if (appointment.status === 'cancelled') {
//     throw new Error('Appointment has already been cancelled')
//   }

//   if (appointment.status === 'finished') {
//     throw new Error('Appointment has already been completed')
//   }

//   const startedAppointment = await prisma.$transaction(
//     async transactionClient => {
//       await transactionClient.payment.update({
//         where: {
//           appointmentId,
//         },
//         data: {
//           paymentStatus: 'paid',
//           paymentDate: new Date().toISOString(),
//         },
//       })

//       const appointmentToStart = await transactionClient.reservation.update({
//         where: {
//           id: appointmentId,
//         },
//         data: {
//           status: 'started',
//         },
//       })

//       if (!appointmentToStart) {
//         await transactionClient.payment.update({
//           where: {
//             appointmentId,
//           },
//           data: {
//             paymentStatus: 'refund',
//           },
//         })
//       }

//       return appointmentToStart
//     },
//   )

//   return startedAppointment
// }

const approveAppointment = async (appointmentId: string): Promise<any> => {
  const appointment = await prisma.reservation.findUnique({
    where: {
      id: appointmentId,
    },
  })
  if (!appointment) {
    throw new Error('Appointment does not exist')
  }
  if (appointment.status === 'cancelled') {
    throw new Error('Appointment has already been cancelled')
  }
  if (appointment.status === 'finished') {
    throw new Error('Appointment has already been completed')
  }
  const appointmentToFinish = await prisma.reservation.update({
    where: {
      id: appointmentId,
    },
    data: {
      status: 'approved',
    },
  })

  return appointmentToFinish
}

const getAllAppointments = async (): Promise<Reservation[] | any> => {
  const result = await prisma.reservation.findMany({
    include: {
      user: true,
      listing: true,
    },
  })
  const total = await prisma.reservation.count()
  return {
    meta: {
      total,
    },
    data: result,
  }
}

const getSingleAppointment = async (
  id: string,
): Promise<Reservation | null> => {
  const result = await prisma.reservation.findUnique({
    where: {
      id: id,
    },
    include: {
      listing: true,
      user: true,
    },
  })
  return result
}

const updateAppointment = async (
  id: string,
  appointment: Reservation,
): Promise<Reservation> => {
  const result = await prisma.reservation.update({
    where: {
      id: id,
    },
    data: appointment,
  })
  return result
}

const deleteAppointment = async (id: string): Promise<Reservation> => {
  const result = await prisma.reservation.delete({
    where: {
      id: id,
    },
  })
  return result
}

export const appointmentServices = {
  bookAppointment,
  cancelAppointment,
  // startAppointment,
  approveAppointment,
  getAllAppointments,
  getSingleAppointment,
  updateAppointment,
  deleteAppointment,
}
