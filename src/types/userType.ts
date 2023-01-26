import { Commandes } from "../entity/Commandes";

/**
 * Création de l'interface IUser */ 
export interface IUser {
    id: number;
    username: string;
    password: string;
    e_mail: string;
    admin: boolean;
    commandes_id: Commandes[];
};