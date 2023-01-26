// Imports
import express = require("express");
import { CommandesController } from "../controllers/commandesController";
import { authenticateJWT } from "../middleware/auth";


// Exports - Déclarations
export const commandesRouter = express.Router();
const commandesController = new CommandesController();


// Routes
commandesRouter.get('/:id', commandesController.getOneCommande);
commandesRouter.get('/', commandesController.getAllCommandes);
commandesRouter.post('/', authenticateJWT, commandesController.postCommande);
commandesRouter.put('/:id', authenticateJWT, commandesController.putCommande);
commandesRouter.delete('/:id', authenticateJWT, commandesController.deleteCommande);