// Imports
import { BaseEntity } from "typeorm";
import { Menus } from "../entity/Menus";
import { Restaurants } from "../entity/Restaurants";


// Exports - Déclarations
export class RestaurantsService extends BaseEntity {

    async selectAllRestaurants() {
        const restaurants = await Restaurants.find();

        if (restaurants) {
            return restaurants;
        };

        return undefined;
    };

    async selectRestaurantById(id: number) {
        const restaurants = await Restaurants.findOneBy({ id: id });

        if (restaurants) {
            return restaurants;
        };

        return undefined;
    };

    async addRestaurant(ville) {
        const newRestaurant = new Restaurants();
        newRestaurant.ville = ville;

        await newRestaurant.save();

        return newRestaurant;
    };

    async updateRestaurant(updateId, ville ) {
        const updateRestaurant = await Restaurants.update({ id: updateId }, { ville: ville });
        if (updateRestaurant) {
            return await Restaurants.findOneBy({ id: updateId });
        };

        return undefined;
    };

    async deleteRestaurant(deleteId: number) {
        const deleteRestaurant = await Restaurants.findOneBy({id: deleteId});
        await deleteRestaurant.remove();

        if (deleteRestaurant) {
            return deleteRestaurant;
        };
        return undefined;
    };

};