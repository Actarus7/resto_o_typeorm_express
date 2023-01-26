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
exports.CommandesController = void 0;
const commandesService_1 = require("../services/commandesService");
const commandesService = new commandesService_1.CommandesService();
class CommandesController {
    getOneCommande(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const commande_id = parseInt(req.params.id);
            try {
                const commande = yield commandesService.selectCommandeById(commande_id);
                res.status(200).json({
                    status: "OK",
                    message: "Commande récupérée",
                    data: commande
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
    getAllCommandes(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            // const commande_id = parseInt(req.params.id)
            try {
                const commande = yield commandesService.test();
                res.status(200).json({
                    status: "OK",
                    message: "Commande récupérée",
                    data: commande
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
    postCommande(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { price, menus_id, user_id, statut_id } = req.body;
            try {
                const commande = yield commandesService.addCommande(price, menus_id, user_id, statut_id);
                res.status(200).json({
                    status: "OK",
                    message: "Commande crée",
                    data: commande
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
exports.CommandesController = CommandesController;
;
