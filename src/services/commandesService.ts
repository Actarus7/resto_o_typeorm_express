// Imports
import { Commandes } from "../entity/Commandes";
import { ICommande } from "../types/commandeType";


// Exports - Déclarations
export class CommandesService {

    // RECUPERE TOUTES LES COMMANDES
    // Méthode Autre
    async selectAllCommandes(): Promise<ICommande[]> {
        const commandes = await Commandes.find({
            relations: {
                menu_id: true,
                user_id: true,
                restaurant_id: true
            }
        });

        if (commandes) {
            return commandes;
        };

        return undefined;
    };
    // Méthode QueryBuilder
    /* async selectAllCommandes() {
        const commandes = await Commandes.findAllCommandes();

        if (commandes) {
            return commandes;
        };

        return undefined;
    }; */


    // RECUPERE UNE COMMANDE (par son Id)
    // Méthode Autre
    async selectCommandeById(id: number): Promise<ICommande> {
        const commande = await Commandes.findOneBy({ id: id });

        if (commande) {
            return commande;
        };

        return undefined;
    };
    // Méthode QueryBuilder
    /* async selectCommandeById(id: number) {
        const commande = await Commandes.findCommandeById(id);

        if (commande) {
            return commande;
        };

        return undefined;
    }; */


    // CREATION D'UNE NOUVELLE COMMANDE
    // Méthode Autre
    async addCommande(price, menu_id, user_id, restaurant_id): Promise<ICommande> {
        const newCommande = new Commandes()
        newCommande.price = price;
        newCommande.menu_id = menu_id;
        newCommande.user_id = user_id;
        newCommande.restaurant_id = restaurant_id;

        await newCommande.save();

        return newCommande;


    };
    // Méthode QueryBuilder
    /* async addCommande(price: number, menu_id: number, user_id: number, restaurant_id: number) {
        const newCommande = await Commandes.createCommande(price, menu_id, user_id, restaurant_id);

        return newCommande.raw;

    }; */


    // MODIFICATION D'UNE COMMANDE
    // Méthode Autre
    async updateCommande(updateId, price, menu_id, user_id, restaurant_id): Promise<ICommande> {
        const updateCommande = await Commandes.update({ id: updateId }, { price: price, menu_id: menu_id, user_id: user_id, restaurant_id: restaurant_id });
        if (updateCommande) {
            return await Commandes.findOneBy({ id: updateId });
        };

        return undefined;
    };
    // Méthode QueryBuilder
    /* async updateCommande(updateId: number, price: number, menu_id: number, user_id: number, restaurant_id: number) {
        const updatedCommande = await Commandes.updateCommande(updateId, price, menu_id, user_id, restaurant_id);

        return updatedCommande.raw;
    }; */


    // DELETE D'UNE COMMANDE
    // Méthode Autre
    async deleteCommande(deleteId: number): Promise<ICommande> {
        const deleteCommande = await Commandes.findOneBy({ id: deleteId });
        await deleteCommande.remove();

        if (deleteCommande) {
            return deleteCommande;
        };
        return undefined;
    };
    // Méthode QueryBuilder
    /* async deleteCommande(deleteId: number) {
        const deletedCommande = await Commandes.deleteCommande(deleteId);

        return deletedCommande.raw;
    }; */

};