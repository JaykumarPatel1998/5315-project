import Restaurant from "../models/restaurant.js";

export const getRestaurantById = async (req, res, next) => {
    try {
        const restaurant = await Restaurant.findById(req.params.id);
        return res.status(200).json(restaurant);
    } catch (error) {
        next(error)
    }
}

export const addRestaurant = async (req, res, next) => {
    try {
        const restaurantBody = req.body;

        const restaurant = new Restaurant({
            ...restaurantBody
        })

        const document = await restaurant.save()
        return res.status(201).json(document);

    } catch (error) {
        next(error)
    }
}

export const getAllRestaurants = async (req, res, next) => {
    try {
        const query = req.query

        const page = (query.page && query.page !== "") ? Math.max(1, parseInt(query.page)) : 1
        const perPage = (query.perPage && query.perPage !== "") ? Math.max(0, parseInt(query.perPage)) : 10
        const borough = query.borough

        /**
        
        * Calculate the itemsToSkip based on the page number and items per page
        * if we wanna calculate the index of the first record for the specified page number then
        * we can use formula:  pageIndex (starts with 0) * items per page + 1
        * this formula will also help us find out the number of elements we would have to skip,
        * if we just remove +1 at the end of formula

        */

        const itemsToSkip = (page - 1) * perPage;

        const restaurants = await Restaurant
        .find()
        .setOptions({ lean : true })
        .where('borough').regex((borough && borough !== "")  ? RegExp(borough, 'i') : RegExp('^'))
        .sort({restaurant_id: 'asc'})
        .skip(itemsToSkip)
        .limit(perPage)
        .exec();
        
        // Prepare the response object with pagination metadata
        const response = {
            totalResults: restaurants.length,
            restaurants
        };

        res.render('restaurants', {
            title : "restaurants",
            data : response.restaurants
        })
    } catch (error) {
        next(error)
    }
}

export const updateRestaurantById = async (req, res, next) => {
    try {
        const restaurantToUpdate = req.body;
        const id = req.params.id;

        await Restaurant.findByIdAndUpdate(id, restaurantToUpdate, {upsert : true}).exec()
        return res.status(200).json({
            message : `Restaurant with id : ${id} updated successfully`
        })
    } catch (error) {
        next(error)
    }
}

export const deleteRestaurantById = async (req, res, next) => {
    try {
        const id = req.params.id;

        await Restaurant.findByIdAndDelete(id).exec()

        return res.status(200).json({
            message : `Restaurant with id : ${id} deleted successfully`
        })
    } catch (error) {
        next(error)
    }
}