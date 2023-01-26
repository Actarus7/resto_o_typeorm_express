import { Request, Response } from "express";
import { Restaurants } from "../entity/Restaurants";
import { Users } from "../entity/User";
import { RestaurantsService } from "../services/restaurantsService";
import { UsersService } from "../services/usersService";

const restaurantsService = new RestaurantsService();
const usersService = new UsersService();


export class RestaurantsController {

    // RECUPERATION DE TOUS LES RESTAURANTS
    async getAllRestaurants(req: Request, res: Response) {

        try {
            const restaurants = await restaurantsService.selectAllRestaurants();

            if (!restaurants) {
                res.status(400).json({
                    status: "FAIL",
                    message: "Aucun restaurant disponible",
                    data: null
                });
            }

            else {
                res.status(200).json({
                    status: "OK",
                    message: "Restaurants disponibles",
                    data: restaurants
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

    // RECUPERATION D'UN RESTAURANT (par son Id)
    async getRestaurantById(req: Request, res: Response) {
        const restaurant_id = parseInt(req.params.id);

        // VERIFIE LA DONNEE COTE UTILISATEUR
        if (!restaurant_id || (typeof (restaurant_id) === 'number')) {
            res.status(400).json({
                status: 'FAIL',
                message: "Id manquant ou Type de donnée incorrect (attendu 'Number')",
                data: null
            });

            return;
        };

        // RECUPERATION DU RESTAURANT
        try {
            const restaurant = await restaurantsService.selectRestaurantById(restaurant_id);

            if (!restaurant) {
                res.status(400).json({
                    status: "FAIL",
                    message: "Restaurant inconnu",
                    data: null
                });
            }

            else {
                res.status(200).json({
                    status: "OK",
                    message: "Restaurant récupéré",
                    data: restaurant
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

    // CREATION D'UN NOUVEAU RESTAURANT
    async postRestaurant(req: Request, res: Response) {
        const ville = req.body.ville;
        const userId = Number(req.userId);

        // VERIFIE LES DONNEES COTE UTILSATEUR
        if (!ville || (typeof (ville) != 'string')) {
            res.status(400).json({
                status: 'FAIL',
                message: "Ville manquant ou type de donnée incorrect",
                data: null
            });

            return;
        };


        try {
            // VERIFIE SI UN RESTAURANT EXISTE DEJA DANS CETTE VILLE
            const isRestaurantAlreadyExists = await restaurantsService.selectRestaurantByVille(ville); // ou bien await Restaurants.findOneBy({ville: ville});

            if (isRestaurantAlreadyExists) {
                res.status(400).json({
                    status: 'FAIL',
                    message: "Un restaurant existe déjà dans cette ville",
                    data: null
                });
                return;
            };

            // VERIFIE SI LE USER CONNECTE EST UN ADMIN
            const userLogged = await usersService.selectUserById(userId) // ou bien await Users.findOneBy({ id: userId });

            if (!userLogged.admin) {
                res.status(401).json({
                    status: 'FAIL',
                    message: "Il faut être admin pour ajouter un nouveau restaurant",
                    data: null
                });

                return;
            };


            // CREATION DU NOUVEAU RESTAURANT
            const newRestaurant = await restaurantsService.addRestaurant(ville);

            res.status(200).json({
                status: "OK",
                message: "Restaurant créé",
                data: newRestaurant
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

    // MODIFICATION D'UN RESTAURANT
    async putRestaurant(req: Request, res: Response) {
        const updateId = parseInt(req.params.id);
        const ville = req.body.ville;
        const userId = Number(req.userId);

        // VERIFICATION DES DONNEES COTE UTILISATEUR 
        if (!ville || (typeof (ville) != 'string')) {
            res.status(400).json({
                status: 'FAIL',
                message: "Ville manquant ou type de donnée incorrect",
                data: null
            });

            return;
        };

        try {
            // VERIFIE SI LE RESTAURANT A MODIFIER EXISTE
            const isRestaurant = await restaurantsService.selectRestaurantById(updateId) // ou bien await Restaurants.findOneBy({ id: updateId });

            if (!isRestaurant) {
                res.status(400).json({
                    status: 'FAIL',
                    message: "Restaurant Id inconnu - Vérifiez l'Id du restaurant",
                    data: null
                });

                return;
            };

            // VERIFIE SI LE USER CONNECTE EST UN ADMIN
            const userLogged = await usersService.selectUserById(userId) // ou bien await Users.findOneBy({ id: userId });

            if (!userLogged?.admin) {
                res.status(401).json({
                    status: 'FAIL',
                    message: "Il faut être admin pour modifier un restaurant",
                    data: null
                });

                return;
            };

            // MODIFICATION DU RESTAURANT
            const updatedRestaurant = await restaurantsService.updateRestaurant(updateId, ville);

            res.status(200).json({
                status: "OK",
                message: "Restaurant modifié",
                data: updatedRestaurant
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

    // SUPPRESSION D'UN RESTAURANT
    async deleteRestaurant(req: Request, res: Response) {
        const deleteId = parseInt(req.params.id);
        const user_IdLogged = req.userId;

        // VERIFICATION DE LA DONNEE COTE UTILISATEUR
        if (!deleteId || (typeof (deleteId) !== 'number')) {
            res.status(400).json({
                status: 'FAIL',
                message: "Id manquant ou Type de donnée incorrect (attendu 'Number')",
                data: null
            });

            return;
        };


        try {
            // VERIFIE SI LE RESTAURANT A SUPPRIMER EXISTE
            const isRestaurant = await restaurantsService.selectRestaurantById(deleteId); // ou bien await Restaurants.findOneBy({id: deleteId})

            if (!isRestaurant) {
                res.status(404).json({
                    status: 'FAIL',
                    message: "Restaurant ID inconnu - Vérifier le numéro du restaurant",
                    data: null
                });

                return;
            };

            // VERIFIE SI LE USER CONNECTE EST UN ADMIN
            const userLogged = await usersService.selectUserById(user_IdLogged)// ou bien await Users.findUserById(user_IdLogged);

            if (!userLogged?.admin) {
                res.status(403).json({
                    status: 'FAIL',
                    message: "Il faut être admin pour delete un restaurant",
                    data: null
                });

                return;
            };

            // SUPPRESSION DU RESTAURANT
            const deleteRestaurant = await restaurantsService.deleteRestaurant(deleteId);

            res.status(200).json({
                status: "OK",
                message: "Restaurant supprimé",
                data: deleteRestaurant
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