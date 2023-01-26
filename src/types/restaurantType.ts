import { Commandes } from "../entity/Commandes";

/**
 * Création de l'interface IRestaurant */ 
export interface IRestaurant {
    id: number;
    ville: string;
    commandes_id: Commandes[];
};