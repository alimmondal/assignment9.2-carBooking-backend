/* eslint-disable @typescript-eslint/no-explicit-any */
import express from 'express'

import { adminRoutes } from '../modules/Admins/admins.routes'
import { authRoutes } from '../modules/Auth/auth.route'

import { listingRoutes } from '../modules/Listings/Listings.routes'
import { paymentRoutes } from '../modules/Payments/payments.routes'
import { appointmentRoutes } from '../modules/reservations/reservations.routes'
import { ReviewsRoutes } from '../modules/reviewRating/reviewRating.routes'
import { userRoutes } from '../modules/users/users.routes'

const router = express.Router()

const moduleRoutes: any[] = [
  {
    path: '/users',
    route: userRoutes,
  },

  {
    path: '/appointments',
    route: appointmentRoutes,
  },

  {
    path: '/listings',
    route: listingRoutes,
  },
  {
    path: '/reviews',
    route: ReviewsRoutes,
  },
  {
    path: '/payments',
    route: paymentRoutes,
  },
  {
    path: '/admins',
    route: adminRoutes,
  },
  {
    path: '/auth',
    route: authRoutes,
  },
]

moduleRoutes.forEach(route => router.use(route.path, route.route))
export default router
