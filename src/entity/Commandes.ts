import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, BaseEntity } from 'typeorm';
import { Menus } from './Menus';
import { Restaurants } from './Restaurants';
import { Users } from './User';

@Entity()
export class Commandes extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'timestamp with time zone', default: () => "CURRENT_TIMESTAMP" })
    date: Date;

    @Column({ type: 'numeric' })
    price: number;

    @ManyToOne(() => Users, (user) => user.commandes_id)
    user_id: Users;

    @ManyToOne(() => Menus, menu => menu.commandes_id)
    menu_id: Menus;

    @ManyToOne(() => Restaurants, restaurant => restaurant.commandes_id)
    restaurant_id: Restaurants;


    static findAllCommandes() {
        return this.createQueryBuilder("commandes")
            .getRawMany();
    };

    static findCommandeById(id: number) {
        return this.createQueryBuilder("commandes")
            .where("commandes.id = :id", { id })
            .getRawOne();
    };

    static createCommande(price, menu_id, user_id, restaurant_id) {
        return this.createQueryBuilder()
            .insert()
            .into(Commandes)
            .values([
                { price: price, menu_id: menu_id, user_id: user_id, restaurant_id }
            ])
            .returning("*")
            .execute()
    };

    static updateCommande(updateId, price, menu_id, user_id, restaurant_id) {
        return this.createQueryBuilder()
            .update(Commandes)
            .set({ price: price, menu_id: menu_id, user_id: user_id, restaurant_id: restaurant_id })
            .where("id =:id", { id: updateId })
            .returning('*')
            .execute();
    };

    static deleteCommande(deleteId) {
        return this.createQueryBuilder("commandes")
            .delete()
            .from(Commandes)
            .where("id = :id", { id: deleteId })
            .returning("*")
            .execute();
    };

};