import { Request, Response } from "express";
import { Commandes } from "../entity/Commandes";
import { Menus } from "../entity/Menus";
import { Restaurants } from "../entity/Restaurants";
import { Users } from "../entity/User";
import { CommandesService } from "../services/commandesService";


const commandesService = new CommandesService();


export class CommandesController {

    // RECUPERE TOUTES LES COMMANDES
    async getAllCommandes(req: Request, res: Response) {

        try {
            const commandes = await commandesService.selectAllCommandes();

            if (!commandes) {
                res.status(400).json({
                    status: "FAIL",
                    message: "Aucune commande disponible",
                    data: null
                });
            }

            else {
                res.status(200).json({
                    status: "OK",
                    message: "Commandes disponibles",
                    data: commandes
                });
            };
        }

        catch (error) {
            console.log((error.stack));

            res.status(500).json({
                status: "FAIL",
                message: "Erreur serveur ou inconnue",
                data: null
            });
        };
    };

    // RECUPERE UNE COMMANDE (par son Id)
    async getOneCommande(req: Request, res: Response) {
        const commande_id = parseInt(req.params.id);

        // VERIFIE LA DONNEE COTE UTILISATEUR
        if (!commande_id || (typeof (commande_id) === 'number')) {
            res.status(400).json({
                status: 'FAIL',
                message: "Id manquant ou Type de donnée incorrect (attendu 'Number')",
                data: null
            });

            return;
        };

        // RECUPERATION DE LA COMMANDE
        try {
            const commande = await commandesService.selectCommandeById(commande_id);

            if (!commande) {
                res.status(400).json({
                    status: "FAIL",
                    message: "Commande inconnue",
                    data: null
                });
            }

            else {
                res.status(200).json({
                    status: "OK",
                    message: "Commande récupérée",
                    data: commande
                });
            };
        }

        catch (error) {
            console.log((error.stack));

            res.status(500).json({
                status: "FAIL",
                message: "Erreur serveur ou inconnue",
                data: null
            });
        };
    };

    // CREATION D'UNE COMMANDE (d'un menu d'un restaurant)
    async postCommande(req: Request, res: Response) {
        const { menu_id, restaurant_id } = req.body;
        const user_IdLogged = Number(req.userId);

        const error = {
            statusCode: 400,
            message: '',
            status: 'FAIL',
            data: null
        };

        // VERIFIE SI LES DONNEES COTE UTILISATEUR SONT CORRECTES
        if (!menu_id || (typeof (menu_id) != 'number')) {
            error.message = "Menu_id manquant ou Type de donnée incorrect"
        }

        else if (!restaurant_id || (typeof (restaurant_id) != 'number')) {
            error.message = "Restaurant_id manquant ou Type de donnée incorrect"
        }

        if (error.message) {
            res.status(error.statusCode).json({
                status: 'FAIL',
                message: error.message,
                data: null
            });

            return;
        };


        try {
            // VERIFIE SI LE RESTAURANT EXISTE
            const isRestaurant = await Restaurants.findOneBy({ id: restaurant_id });

            if (!isRestaurant) {
                res.status(400).json({
                    status: 'FAIL',
                    message: "Ce restaurant n'existe pas",
                    data: null
                });

                return;
            };

            // VERIFIE SI LE MENU EXISTE
            const isMenu = await Menus.findOneBy({ id: menu_id });

            if (!isMenu) {
                res.status(400).json({
                    status: 'FAIL',
                    message: "Ce menu n'existe pas",
                    data: null
                });

                return;
            };

            // RECUPERE LE PRIX DU MENU CHOISI
            const price = Number(isMenu.price);


            // CREATION DE LA NOUVELLE COMMANDE
            const newCommande = await commandesService.addCommande(price, menu_id, user_IdLogged, restaurant_id);

            res.status(200).json({
                status: "OK",
                message: "Commande créée",
                data: newCommande
            });
        }

        catch (error) {
            console.log((error.stack));

            res.status(500).json({
                status: "FAIL",
                message: "Erreur serveur",
                data: null
            });
        };
    };

    // MODIFICATION D'UNE COMMANDE (d'un menu d'un restaurant)
    async putCommande(req: Request, res: Response) {
        const { price, menu_id, restaurant_id } = req.body;
        const user_IdLogged = Number(req.userId);
        const updateId = parseInt(req.params.id);

        const error = {
            statusCode: 400,
            message: '',
            status: 'FAIL',
            data: null
        };

        // VERIFIE SI LES DONNEES COTE UTILISATEUR SONT CORRECTES
        if (!price || (typeof (price) != 'number')) {
            error.message = "Prix manquant ou Type de donnée incorrect"
        }

        else if (!menu_id || (typeof (menu_id) != 'number')) {
            error.message = "Menu_id manquant ou Type de donnée incorrect"
        }

        else if (!restaurant_id && (typeof (restaurant_id) != 'number')) {
            error.message = "Restaurant_id manquant ou Type de donnée incorrect"
        }


        if (error.message) {
            res.status(error.statusCode).json({
                status: 'FAIL',
                message: error.message,
                data: null
            });

            return;
        };


        try {
            // VERIFIE SI LA COMMANDE A MODIFIER EXISTE
            const checkCommande = await Commandes.findCommandeById(updateId);

            if (!checkCommande) {
                res.status(404).json({
                    status: 'FAIL',
                    message: "Ticket ID inconnu - Vérifier le numéro du ticket",
                    data: null
                });

                return;
            };

            // VERIFIE SI LE USER CONNECTE EST ADMIN
            const admin_user_id_logged = await Users.findUserById(user_IdLogged);

            if (!(user_IdLogged === checkCommande.user_id) && (admin_user_id_logged?.admin)) {
                res.status(403).json({
                    status: 'FAIL',
                    message: "Delete non autorisé - Vous n'êtes pas le propriétaire de l'article et n'êtes pas admin",
                    data: null
                });

                return;
            };

            // VERIFIE SI LE MENU A AJOUTER EXISTE
            const isMenu = await Menus.findOneBy({ id: menu_id });

            if (!isMenu) {
                res.status(400).json({
                    status: 'FAIL',
                    message: "Le nouveau menu n'existe pas - Choisissez un autre menu",
                    data: null
                });

                return;
            };

            // VERIFIE SI LE RESTAURANT A AJOUTER EXISTE
            const isRestaurant = await Restaurants.findOneBy({ id: restaurant_id });

            if (!isRestaurant) {
                res.status(400).json({
                    status: 'FAIL',
                    message: "Le nouveau restaurant n'existe pas - Choisissez un autre restaurant",
                    data: null
                });

                return;
            };

            // UPDATE DE LA COMMANDE
            const updatedCommande = await commandesService.updateCommande(updateId, price, menu_id, user_IdLogged, restaurant_id);

            res.status(200).json({
                status: "OK",
                message: "Commande modifiée",
                data: updatedCommande
            });
        }

        catch (error) {
            console.log((error.stack));

            res.status(500).json({
                status: "FAIL",
                message: "Erreur serveur",
                data: null
            });
        };
    };

    // DELETE D'UNE COMMANDE (d'un menu d'un restaurant)
    async deleteCommande(req: Request, res: Response) {
        const deleteId = parseInt(req.params.id);
        const user_IdLogged = req.userId;

        if (!deleteId || (typeof (deleteId) === 'number')) {
            res.status(400).json({
                status: 'FAIL',
                message: "Id manquant ou Type de donnée incorrect (attendu 'Number')",
                data: null
            });

            return;
        };


        try {
            const checkCommande = await Commandes.findCommandeById(deleteId);
            const admin_user_id_logged = await Users.findUserById(user_IdLogged);

            if (!checkCommande) {
                res.status(404).json({
                    status: 'FAIL',
                    message: "Commande ID inconnu - Vérifier le numéro de la commande",
                    data: null
                });

                return;
            };


            if (!(user_IdLogged === checkCommande.commandes_userIdId) && !(admin_user_id_logged?.admin)) {
                res.status(403).json({
                    status: 'FAIL',
                    message: "Delete non autorisé - Vous n'êtes pas le propriétaire de la commande, ni admin",
                    data: null
                });

                return;
            };


            const deletedCommande = await commandesService.deleteCommande(deleteId);

            res.status(200).json({
                status: "OK",
                message: "Commande supprimée",
                data: deletedCommande
            });
        }
        
        catch (error) {
            console.log((error.stack));

            res.status(500).json({
                status: "FAIL",
                message: "Erreur serveur",
                data: null
            });
        };
    };

};