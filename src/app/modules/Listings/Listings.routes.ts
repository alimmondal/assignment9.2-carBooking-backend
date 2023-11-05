import express from 'express'
import { ListingController } from './Listings.controller'

const router = express.Router()

router.post('/create-car', ListingController.createListing)
router.get('/', ListingController.getAllListings)
router.get('/:id', ListingController.getSingleListing)
// router.post('/comments/:id', ListingController.updateComment)
router.patch('/:id', ListingController.updateListing)
router.delete('/:id', ListingController.deleteListing)

export const listingRoutes = router
