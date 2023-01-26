import { Request, Response } from "express";
import { Restaurants } from "../entity/Restaurants";
import { Users } from "../entity/User";
import { RestaurantsService } from "../services/restaurantsService";

const restaurantsService = new RestaurantsService();


export class RestaurantsController {

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

    async getRestaurantById(req: Request, res: Response) {
        const restaurant_id = parseInt(req.params.id);

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

    async postRestaurant(req: Request, res: Response) {
        const ville = req.body.ville;
        const userId = Number(req.userId);

        if (!ville || (typeof (ville) != 'string')) {
            res.status(400).json({
                status: 'FAIL',
                message: "Ville manquant ou type de donnée incorrect",
                data: null
            });

            return;
        };


        try {
            const userLogged = await Users.findOneBy({ id: userId });

            if (!userLogged.admin) {
                res.status(401).json({
                    status: 'FAIL',
                    message: "Il faut être admin pour ajouter un nouveau restaurant",
                    data: null
                });

                return;
            };


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

    async putRestaurant(req: Request, res: Response) {
        const updateId= parseInt(req.params.id);
        const ville = req.body.ville;
        const userId = Number(req.userId);

        if (!ville || (typeof (ville) != 'string')) {
            res.status(400).json({
                status: 'FAIL',
                message: "Ville manquant ou type de donnée incorrect",
                data: null
            });

            return;
        };

        try {
            const checkRestaurant = await Restaurants.findOneBy({id: updateId});

            if (!checkRestaurant){
                res.status(400).json({
                    status: 'FAIL',
                    message: "Restaurant Id inconnu - Vérifiez l'Id du restaurant",
                    data: null
                });

                return;
            };

            const userLogged = await Users.findOneBy({ id: userId });

            if (!userLogged?.admin) {
                res.status(401).json({
                    status: 'FAIL',
                    message: "Il faut être admin pour modifier un restaurant",
                    data: null
                });

                return;
            };

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

    async deleteRestaurant(req: Request, res: Response){
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

            const checkRestaurant = await Restaurants.findOneBy({ id: deleteId });
            
            if (!checkRestaurant) {
                res.status(404).json({
                    status: 'FAIL',
                    message: "Restaurant ID inconnu - Vérifier le numéro du restaurant",
                    data: null
                });
                
                return;
            };
            

            const userLogged = await Users.findUserById(user_IdLogged);

            if (!userLogged?.admin) {
                res.status(403).json({
                    status: 'FAIL',
                    message: "Il faut être admin pour delete un restaurant",
                    data: null
                });

                return;
            };


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