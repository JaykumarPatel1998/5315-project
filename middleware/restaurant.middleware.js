import createHttpError from "http-errors";
import Restaurant from "../models/restaurant.js";
import { isObjectIdOrHexString } from "mongoose";


// middleware function used to validate if the resource user is trying to modify exists in the Db or not
export const validateRestaurantExistsBeforeModification = async (req, res, next) => {
    try {
        if (!isObjectIdOrHexString(req.params.id)) {
            throw createHttpError(400, "Invalid Id provided in request params")
        }

        const restaurant = await Restaurant.findById(req.params.id);
        if (!restaurant) {
            throw createHttpError(404, "Resource does not exist!")
        } else {
            next()
        }
    } catch (error) {
        next(error)
    }
}