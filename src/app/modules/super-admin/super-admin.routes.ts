import express from 'express'
import { superAdminController } from './super-admin.controller'

const router = express.Router()

router.post('/create-super-admin', superAdminController.createSuperAdmin)
router.get('/', superAdminController.getAllSuperAdmins)
router.get('/:id', superAdminController.getSingleSuperAdmin)
router.patch('/:id', superAdminController.updateSuperAdmin)
router.delete('/:id', superAdminController.deleteSuperAdmin)

export const superAdminRoutes = router
