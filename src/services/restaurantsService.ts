// Imports
import { BaseEntity } from "typeorm";
import { Restaurants } from "../entity/Restaurants";
import { IRestaurant } from "../types/restaurantType";


// Exports - Déclarations
export class RestaurantsService extends BaseEntity {

    // RECUPERE TOUS LES RESTAURANTS
    async selectAllRestaurants(): Promise<IRestaurant []> {
        const restaurants = await Restaurants.find();

        if (restaurants) {
            return restaurants;
        };

        return undefined;
    };

    // RECUPERE UN RESTAURANT (par son Id)
    async selectRestaurantById(id: number): Promise<IRestaurant> {
        const restaurant = await Restaurants.findOneBy({ id: id });

        if (restaurant) {
            return restaurant;
        };

        return undefined;
    };

    //RECUPERE UN RESTAURANT (par son nom de ville)
    async selectRestaurantByVille(ville: string): Promise<IRestaurant> {
        const restaurant = await Restaurants.findOneBy({ ville: ville });

        if (restaurant) {
            return restaurant;
        };

        return undefined;
    };

    // CREATION D'UN NOUVEAU RESTAURANT
    async addRestaurant(ville): Promise<IRestaurant> {
        const newRestaurant = new Restaurants();
        newRestaurant.ville = ville;

        await newRestaurant.save();

        return newRestaurant;
    };

    // MODIFICATION D'UN RESTAURANT
    async updateRestaurant(updateId, ville): Promise<IRestaurant> {
        const updateRestaurant = await Restaurants.update({ id: updateId }, { ville: ville });
        if (updateRestaurant) {
            return await Restaurants.findOneBy({ id: updateId });
        };

        return undefined;
    };

    // SUPPRESSION D'UN RESTAURANT
    async deleteRestaurant(deleteId: number): Promise<IRestaurant> {
        const deleteRestaurant = await Restaurants.findOneBy({ id: deleteId });
        await deleteRestaurant.remove();

        if (deleteRestaurant) {
            return deleteRestaurant;
        };
        return undefined;
    };

};