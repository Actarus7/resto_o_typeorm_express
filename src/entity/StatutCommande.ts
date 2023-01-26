import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Commandes } from './Commandes';

@Entity ()
export class StatutCommande {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'varchar'})
    intitule: string;

    @ManyToOne(() => Commandes, (commande) => commande.id)
    commande_id: Commandes;

};