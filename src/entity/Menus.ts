import { Entity, Column, PrimaryGeneratedColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, BaseEntity } from 'typeorm';
import { Commandes } from './Commandes';

@Entity ()
export class Menus extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'varchar'})
    name: string;

    @Column({type: 'money'})
    price: number;

    @OneToMany(() => Commandes, commande => commande.menu_id)
    commandes_id: Commandes []
    
};