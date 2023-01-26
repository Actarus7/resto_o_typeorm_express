// Imports
import express = require("express");
import { RestaurantsController } from "../controllers/restaurantsController";
import { authenticateJWT } from "../middleware/auth";


// Exports - Déclarations
export const restaurantsRouter = express.Router();
const restaurantsController = new RestaurantsController();


// Routes
restaurantsRouter.get('/', restaurantsController.getAllRestaurants);
restaurantsRouter.get('/:id', restaurantsController.getRestaurantById);
restaurantsRouter.post('/', authenticateJWT, restaurantsController.postRestaurant);
restaurantsRouter.put('/:id', authenticateJWT, restaurantsController.putRestaurant);
restaurantsRouter.delete('/:id', authenticateJWT, restaurantsController.deleteRestaurant);