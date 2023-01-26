"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.myDataSource = void 0;
const typeorm_1 = require("typeorm");
const Commande_1 = require("./entity/Commande");
const Menu_1 = require("./entity/Menu");
const Restaurant_1 = require("./entity/Restaurant");
const StatutCommande_1 = require("./entity/StatutCommande");
const User_1 = require("./entity/User");
const dotenv = require("dotenv");
dotenv.config({ path: '.env' });
exports.myDataSource = new typeorm_1.DataSource({
    type: 'postgres',
    host: process.env.DB_HOST,
    port: 5432,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    entities: [User_1.Users, Restaurant_1.Restaurant, Commande_1.Commande, Menu_1.Menu, StatutCommande_1.StatutCommande],
    logging: true,
    synchronize: true,
});
