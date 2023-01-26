// // Imports
// import express = require("express");
// import { RestaurantsController } from "../controllers/restaurantsController";
// import { authenticateJWT } from "../middleware/auth";


// // Exports - Déclarations
// export const menusRouter = express.Router();
// const restaurantsController = new RestaurantsController();


// // Routes
// menusRouter.get('/:id', restaurantsController.getOneMenu);
// menusRouter.get('/', restaurantsController.getAllMenus);
// menusRouter.post('/', authenticateJWT, restaurantsController.postMenu);
// menusRouter.put('/:id', authenticateJWT, restaurantsController.putMenu);
// menusRouter.delete('/:id', authenticateJWT, restaurantsController.deleteMenu);