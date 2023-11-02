import express from 'express'
import { CategoryController } from './category.controller'

const router = express.Router()

router.get('/', CategoryController.getAllFromDB)
router.get('/:id', CategoryController.getByIdFromDB)

router.post(
  '/create-category',
  // validateRequest(CategoryValidation.create),
  // auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  CategoryController.insertIntoDB,
)

router.patch(
  '/:id',
  //   validateRequest(CategoryValidation.update),
  // auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  CategoryController.updateOneInDB,
)

router.delete(
  '/:id',
  // auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  CategoryController.deleteByIdFromDB,
)

export const categoryRoutes = router
