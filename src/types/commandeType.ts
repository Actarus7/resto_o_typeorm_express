import { Menus } from "../entity/Menus";
import { Restaurants } from "../entity/Restaurants";
import { Users } from "../entity/User";

/**
 * Création de l'interface ICommande */ 
export interface ICommande {
    id: number;
    date: Date;
    price: number;
    user_id: Users;
    menu_id: Menus;
    restaurant_id: Restaurants;
};