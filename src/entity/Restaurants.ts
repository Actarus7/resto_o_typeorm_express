import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Commandes } from './Commandes';

@Entity ()
export class Restaurants {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'varchar'})
    ville: string;

    @OneToMany(() => Commandes, commande => commande.restaurant_id)
    commandes_id: Commandes[];

};