import express from 'express'
import * as RestaurantController from '../controllers/restaurant.controller.js'
import { validateRestaurantExistsBeforeModification } from '../middleware/restaurant.middleware.js'
import { verifyToken } from '../middleware/authJwt.js'

const router = express.Router()

router.get("/:id",[verifyToken, validateRestaurantExistsBeforeModification], RestaurantController.getRestaurantById)
router.post("/",[verifyToken], RestaurantController.addRestaurant)
router.get("/",[verifyToken], RestaurantController.getAllRestaurants)
router.put("/:id",[verifyToken],[validateRestaurantExistsBeforeModification], RestaurantController.updateRestaurantById)
router.delete("/:id",[verifyToken],[validateRestaurantExistsBeforeModification], RestaurantController.deleteRestaurantById)

export default router;