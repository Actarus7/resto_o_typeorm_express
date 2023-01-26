import { DataSource } from "typeorm"
import { Commandes } from "./entity/Commandes"
import { Menus } from "./entity/Menus"
import { Restaurants } from "./entity/Restaurants"
import { Users } from "./entity/User"
import * as dotenv from 'dotenv'
dotenv.config({path: '.env'})


export const myDataSource = new DataSource({
    type: 'postgres',
    host: process.env.DB_HOST,
    port: 5432,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    entities: [Users, Restaurants, Commandes, Menus],
    logging: false,
    synchronize: true,
});