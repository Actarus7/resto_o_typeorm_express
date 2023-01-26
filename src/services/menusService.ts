// Imports
import { Menus } from "../entity/Menus";


// Exports - Déclarations
export class MenusService {
    async selectAllMenus() {
        const menus = await Menus.find({
            /* relations: {
                menu_id: true,
                user_id: true,
                restaurant_id: true
            } */
        });

        if (menus) {
            return menus;
        };

        return undefined;
    };

    async selectMenuById(id: number) {
        const menu = await Menus.findOneBy({ id: id });

        if (menu) {
            return menu;
        };

        return undefined;
    };

    async addMenu(name, price) {
        const newMenu = new Menus();
        newMenu.name = name;
        newMenu.price = price;

        await newMenu.save();

        return newMenu;
    };

    async updateMenu(updateId, name, price, ) {
        const updateCommande = await Menus.update({ id: updateId }, { name : name, price: price });
        if (updateCommande) {
            return await Menus.findOneBy({ id: updateId });
        };

        return undefined;
    };

    async deleteMenu(deleteId: number) {
        const deleteMenu = await Menus.findOneBy({id: deleteId});
        await deleteMenu.remove();

        if (deleteMenu) {
            return deleteMenu;
        };
        return undefined;
    };

};