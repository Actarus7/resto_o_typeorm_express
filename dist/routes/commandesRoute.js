"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.commandesRouter = void 0;
// Imports
const express = require("express");
const commandesController_1 = require("../controllers/commandesController");
// Exports - Déclarations
exports.commandesRouter = express.Router();
const commandesController = new commandesController_1.CommandesController();
// Routes
exports.commandesRouter.get('/:id', commandesController.getOneCommande);
exports.commandesRouter.get('/', commandesController.getAllCommandes);
exports.commandesRouter.post('/', commandesController.postCommande);
