// Imports
import { Menus } from "../entity/Menus";
import { IMenu } from "../types/menuType";


// Exports - Déclarations
export class MenusService {

    // RECUPERE TOUS LES MENUS
    async selectAllMenus(): Promise<IMenu[]> {
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

    // RECUPERE UN MENU (par son Id)
    async selectMenuById(id: number): Promise<IMenu> {
        const menu = await Menus.findOneBy({ id: id });

        if (menu) {
            return menu;
        };

        return undefined;
    };

    // CREATION D'UN NOUVEAU MENU
    async addMenu(name, price): Promise<IMenu> {
        const newMenu = new Menus();
        newMenu.name = name;
        newMenu.price = price;

        await newMenu.save();

        return newMenu;
    };

    // MODIFICATION D'UN MENU
    async updateMenu(updateId, name, price,): Promise<IMenu> {
        const updateCommande = await Menus.update({ id: updateId }, { name: name, price: price });
        if (updateCommande) {
            return await Menus.findOneBy({ id: updateId });
        };

        return undefined;
    };

    // SUPPRESSION D'UN MENU
    async deleteMenu(deleteId: number): Promise<IMenu> {
        const deleteMenu = await Menus.findOneBy({ id: deleteId });
        await deleteMenu.remove();

        if (deleteMenu) {
            return deleteMenu;
        };
        return undefined;
    };

};