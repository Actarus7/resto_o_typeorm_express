import { Request, Response } from "express";
import { Commandes } from "../entity/Commandes";
import { Users } from "../entity/User";
import { CommandesService } from "../services/commandesService";


const commandesService = new CommandesService();


export class CommandesController {

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

    async getOneCommande(req: Request, res: Response) {
        const commande_id = parseInt(req.params.id);

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

    async postCommande(req: Request, res: Response) {
        const { price, menu_id, restaurant_id } = req.body;
        const user_IdLogged = Number(req.userId);

        const error = {
            statusCode: 400,
            message: '',
            status: 'FAIL',
            data: null
        };

        if (!price || (typeof (price) != 'number')) {
            error.message = "Prix manquant ou Type de donnée incorrect"
        }

        else if (!menu_id || (typeof (menu_id) != 'number')) {
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
            const newCommande = await commandesService.addCommande(price, menu_id, user_IdLogged, restaurant_id);

            res.status(200).json({
                status: "OK",
                message: "Commande crée",
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
            const checkCommande = await Commandes.findCommandeById(updateId);
            const admin_user_id_logged = await Users.findUserById(user_IdLogged);

            if (!checkCommande) {
                res.status(404).json({
                    status: 'FAIL',
                    message: "Ticket ID inconnu - Vérifier le numéro du ticket",
                    data: null
                });

                return;
            };

            if (!(user_IdLogged === checkCommande.user_id) && (admin_user_id_logged?.admin)) {
                res.status(403).json({
                    status: 'FAIL',
                    message: "Delete non autorisé - Vous n'êtes pas le propriétaire de l'article et n'êtes pas admin",
                    data: null
                });

                return;
            };


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