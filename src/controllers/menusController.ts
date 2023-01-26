import { Request, Response } from "express";
import { Menus } from "../entity/Menus";
import { Users } from "../entity/User";
import { MenusService } from "../services/menusService";


const menusService = new MenusService();


export class MenusController {
    async getAllMenus(req: Request, res: Response) {
        try {
            const menus = await menusService.selectAllMenus();

            if (!menus) {
                res.status(400).json({
                    status: "FAIL",
                    message: "Aucune menu disponible",
                    data: null
                });
            }

            else {
                res.status(200).json({
                    status: "OK",
                    message: "menus disponibles",
                    data: menus
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

    async getOneMenu(req: Request, res: Response) {
        const name = parseInt(req.params.id);

        try {
            const menu = await menusService.selectMenuById(name);

            if (!menu) {
                res.status(400).json({
                    status: "FAIL",
                    message: "Menu inconnu",
                    data: null
                });
            }

            else {
                res.status(200).json({
                    status: "OK",
                    message: "Menu récupéré",
                    data: menu
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

    async postMenu(req: Request, res: Response) {
        const { name, price } = req.body;

        const error = {
            statusCode: 400,
            message: '',
            status: 'FAIL',
            data: null
        };

        if (!price || (typeof (price) != 'number')) {
            error.message = "Prix manquant ou Type de donnée incorrect"
        }

        else if (!name || (typeof (name) != 'string')) {
            error.message = "Name manquant ou Type de donnée incorrect"
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
            const newMenu = await menusService.addMenu(name, price);

            res.status(200).json({
                status: "OK",
                message: "Menu crée",
                data: newMenu
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

    async putMenu(req: Request, res: Response) {
        const { name, price } = req.body;
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

        else if (!name || (typeof (name) != 'string')) {
            error.message = "name manquant ou Type de donnée incorrect"
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
            const checkMenu = await Menus.findOneBy({ id: updateId });
            const admin_user_id_logged = await Users.findUserById(user_IdLogged);

            if (!checkMenu) {
                res.status(404).json({
                    status: 'FAIL',
                    message: "Menu ID inconnu - Vérifier le numéro du menu",
                    data: null
                });

                return;
            };

            if (!admin_user_id_logged?.admin) {
                res.status(403).json({
                    status: 'FAIL',
                    message: "Modification non autorisée - Vous n'êtes pas admin",
                    data: null
                });

                return;
            };


            const updatedMenu = await menusService.updateMenu(updateId, name, price);

            res.status(200).json({
                status: "OK",
                message: "Menu modifié",
                data: updatedMenu
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

    async deleteMenu(req: Request, res: Response) {
        const deleteId = parseInt(req.params.id);
        const user_IdLogged = req.userId;

        if (!deleteId || (typeof (deleteId) !== 'number')) {
            res.status(400).json({
                status: 'FAIL',
                message: "Id manquant ou Type de donnée incorrect (attendu 'Number')",
                data: null
            });

            return;
        };


        try {
            const checkMenu = await Menus.findOneBy({ id: deleteId });
            const admin_user_id_logged = await Users.findUserById(user_IdLogged);

            if (!checkMenu) {
                res.status(404).json({
                    status: 'FAIL',
                    message: "Menu ID inconnu - Vérifier le numéro du menu",
                    data: null
                });

                return;
            };


            if (!admin_user_id_logged?.admin) {
                res.status(403).json({
                    status: 'FAIL',
                    message: "Delete non autorisé - Vous n'êtes pas admin",
                    data: null
                });

                return;
            };


            const deletedMenu = await menusService.deleteMenu(deleteId);

            res.status(200).json({
                status: "OK",
                message: "Menu supprimé",
                data: deletedMenu
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