"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StatutCommande = void 0;
const typeorm_1 = require("typeorm");
const Commande_1 = require("./Commande");
let StatutCommande = class StatutCommande {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], StatutCommande.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar' }),
    __metadata("design:type", String)
], StatutCommande.prototype, "intitule", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Commande_1.Commande, (commande) => commande.id),
    __metadata("design:type", Commande_1.Commande)
], StatutCommande.prototype, "commande_id", void 0);
StatutCommande = __decorate([
    (0, typeorm_1.Entity)()
], StatutCommande);
exports.StatutCommande = StatutCommande;
;
