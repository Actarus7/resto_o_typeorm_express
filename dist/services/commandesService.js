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
exports.CommandesService = void 0;
// Imports
const Commande_1 = require("../entity/Commande");
// Exports - Déclarations
class CommandesService {
    selectCommandeById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const commande = yield Commande_1.Commande.findCommandeById(id);
            return commande;
        });
    }
    ;
    test() {
        return __awaiter(this, void 0, void 0, function* () {
            const test = yield Commande_1.Commande.findAllCommandes();
            return test;
        });
    }
    ;
    addCommande(price, menus_id, user_id, statut_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const newCommande = yield Commande_1.Commande.createCommande(price, menus_id, user_id, statut_id);
            return newCommande.raw;
        });
    }
    ;
    updateCommande(id, price, user_id, statut_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const updatedCommande = yield Commande_1.Commande.updateCommande(id, price, user_id, statut_id);
        });
    }
}
exports.CommandesService = CommandesService;
;
