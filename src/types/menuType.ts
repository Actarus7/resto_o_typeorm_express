import { Commandes } from "../entity/Commandes";

/**
 * Création de l'interface IMenu */ 
export interface IMenu {
    id: number;
    name: string;
    price: number;
    commandes_id: Commandes []
};