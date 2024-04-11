import express from 'express'
import * as RestaurantController from '../controllers/restaurant.controller.js'
import { validateRestaurantExistsBeforeModification } from '../middleware/restaurant.middleware.js'

const router = express.Router()

router.get("/:id",[validateRestaurantExistsBeforeModification], RestaurantController.getRestaurantById)
router.post("/", RestaurantController.addRestaurant)
router.get("/", RestaurantController.getAllRestaurants)
router.put("/:id",[validateRestaurantExistsBeforeModification], RestaurantController.updateRestaurantById)
router.delete("/:id",[validateRestaurantExistsBeforeModification], RestaurantController.deleteRestaurantById)

export default router;