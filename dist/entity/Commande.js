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
var Commande_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Commande = void 0;
const typeorm_1 = require("typeorm");
const Menu_1 = require("./Menu");
const StatutCommande_1 = require("./StatutCommande");
const User_1 = require("./User");
let Commande = Commande_1 = class Commande extends typeorm_1.BaseEntity {
    static findCommandeById(id) {
        return this.createQueryBuilder("commande")
            .where("commande.id = :id", { id })
            .getOne();
    }
    ;
    static findAllCommandes() {
        return this.createQueryBuilder()
            .select("commande.price")
            .from(Commande_1, "commande")
            .getRawMany();
    }
    ;
    static createCommande(price, menus_id, user_id, statut_id) {
        return this.createQueryBuilder()
            .insert()
            .into(Commande_1)
            .values([
            { price: price, menus_id: menus_id, userId: user_id, statut_id: statut_id }
        ])
            .returning("*")
            .execute();
    }
    ;
    static updateCommande(id, price, user_id, statut_id) {
        return this.createQueryBuilder()
            .update(Commande_1)
            .set({ price: price, userId: user_id, statut_id: statut_id })
            .where("id =:id", { id: 1 })
            .returning('*')
            .execute();
    }
    ;
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Commande.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp with time zone', default: () => "CURRENT_TIMESTAMP" }),
    __metadata("design:type", Date)
], Commande.prototype, "date", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'money' }),
    __metadata("design:type", Number)
], Commande.prototype, "price", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => User_1.Users, (user) => user.id),
    __metadata("design:type", User_1.Users)
], Commande.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => StatutCommande_1.StatutCommande, statut => statut.id),
    __metadata("design:type", StatutCommande_1.StatutCommande)
], Commande.prototype, "statut_id", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => Menu_1.Menu),
    (0, typeorm_1.JoinTable)(),
    __metadata("design:type", Array)
], Commande.prototype, "menus_id", void 0);
Commande = Commande_1 = __decorate([
    (0, typeorm_1.Entity)()
], Commande);
exports.Commande = Commande;
;
