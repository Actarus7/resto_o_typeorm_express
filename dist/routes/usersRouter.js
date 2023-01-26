"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.usersRouter = void 0;
// Imports
const express = require("express");
const usersController_1 = require("../controllers/usersController");
// Exports - Déclarations
exports.usersRouter = express.Router();
const usersController = new usersController_1.UsersController();
// Routes
exports.usersRouter.get('/', usersController.getUsers);
