// Imports
import express = require("express");
import { MenusController } from "../controllers/menusController";
import { authenticateJWT } from "../middleware/auth";


// Exports - Déclarations
export const menusRouter = express.Router();
const menusController = new MenusController();


// Routes
menusRouter.get('/:id', menusController.getOneMenu);
menusRouter.get('/', menusController.getAllMenus);
menusRouter.post('/', authenticateJWT, menusController.postMenu);
menusRouter.put('/:id', authenticateJWT, menusController.putMenu);
menusRouter.delete('/:id', authenticateJWT, menusController.deleteMenu);