import { Entity, Column, PrimaryGeneratedColumn, OneToMany, BaseEntity } from 'typeorm';
import { Commandes } from './Commandes';

@Entity ()
export class Restaurants extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'varchar'})
    ville: string;

    @OneToMany(() => Commandes, commande => commande.restaurant_id)
    commandes_id: Commandes[];

};