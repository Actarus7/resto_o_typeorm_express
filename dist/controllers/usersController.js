"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersController = void 0;
const usersService_1 = require("../services/usersService");
// Exports - Déclarations
const usersService = new usersService_1.UsersService();
class UsersController {
    getUsers(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield usersService.selectAllUsers();
                res.status(200).json({
                    status: "OK",
                    message: "Users récupérés",
                    data: users
                });
            }
            catch (error) {
                console.log((error.stack));
                res.status(500).json({
                    status: "FAIL",
                    message: "Erreur serveur",
                    data: null
                });
            }
            ;
        });
    }
    ;
}
exports.UsersController = UsersController;
