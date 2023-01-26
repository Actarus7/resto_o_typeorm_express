// Imports
import express = require("express");
import { UsersController } from "../controllers/usersController";



// Exports - Déclarations
export const usersRouter = express.Router();
const usersController = new UsersController();



// Routes
usersRouter.get('/', usersController.getAllUsers);
usersRouter.post('/register', usersController.register);
usersRouter.post('/login', usersController.login);

