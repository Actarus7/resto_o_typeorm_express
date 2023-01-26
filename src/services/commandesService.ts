// Imports
import { Commandes } from "../entity/Commandes";


// Exports - Déclarations
export class CommandesService {

    // METHODE MASTER QUERYBUILDER
    /* async selectAllCommandes() {
        const commandes = await Commandes.findAllCommandes();

        if (commandes) {
            return commandes;
        };

        return undefined;
    }; */
    // METHODE "SIMPLE"
    async selectAllCommandes() {
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

    // METHODE MASTER QUERYBUILDER
    /* async selectCommandeById(id: number) {
        const commande = await Commandes.findCommandeById(id);

        if (commande) {
            return commande;
        };

        return undefined;
    }; */
    // METHODE "SIMPLE"
    async selectCommandeById(id: number) {
        const commande = await Commandes.findOneBy({ id: id });

        if (commande) {
            return commande;
        };

        return undefined;
    };

    // METHODE MASTER QUERYBUILDER
    /* async addCommande(price: number, menu_id: number, user_id: number, restaurant_id: number) {
        const newCommande = await Commandes.createCommande(price, menu_id, user_id, restaurant_id);

        return newCommande.raw;

    }; */
    // METHODE "SIMPLE"
    async addCommande(price, menu_id, user_id, restaurant_id) {
        const newCommande = new Commandes()
        newCommande.price = price;
        newCommande.menu_id = menu_id;
        newCommande.user_id = user_id;
        newCommande.restaurant_id = restaurant_id;

        await newCommande.save();

        return newCommande;


    };

    // METHODE MASTER QUERYBUILDER
    /* async updateCommande(updateId: number, price: number, menu_id: number, user_id: number, restaurant_id: number) {
        const updatedCommande = await Commandes.updateCommande(updateId, price, menu_id, user_id, restaurant_id);

        return updatedCommande.raw;
    }; */
    // METHODE "SIMPLE"
    async updateCommande(updateId, price, menu_id, user_id, restaurant_id) {
        const updateCommande = await Commandes.update({ id: updateId }, { price: price, menu_id: menu_id, user_id: user_id, restaurant_id: restaurant_id });
        if (updateCommande) {
            return await Commandes.findOneBy({ id: updateId });
        };

        return undefined;
    };

    // METHODE MASTER QUERYBUILDER
    /* async deleteCommande(deleteId: number) {
        const deletedCommande = await Commandes.deleteCommande(deleteId);

        return deletedCommande.raw;
    }; */
    // METHODE "SIMPLE"
    async deleteCommande(deleteId: number) {
        const deleteCommande = await Commandes.findOneBy({id: deleteId});
        await deleteCommande.remove();

        if (deleteCommande) {
            return deleteCommande;
        };
        return undefined;
    };
};

