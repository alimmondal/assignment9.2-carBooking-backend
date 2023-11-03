import express from 'express'
import { ReviewRatingController } from './reviewRating.controller'
const router = express.Router()

router.get('/', ReviewRatingController.getAllFromDB)
router.get('/:id', ReviewRatingController.getByIdFromDB)
router.post(
  '/',
  // auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  // validateRequest(ReviewValidation.create),
  ReviewRatingController.insertIntoDB,
)
router.patch(
  '/:id',
  // auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  // validateRequest(ReviewValidation.update),
  ReviewRatingController.updateIntoDB,
)
router.delete(
  '/:id',
  // auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  ReviewRatingController.deleteFromDB,
)

export const ReviewsRoutes = router
