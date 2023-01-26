import { Entity, Column, PrimaryGeneratedColumn, OneToMany, BaseEntity } from 'typeorm';
import { Commandes } from './Commandes';


@Entity ()
export class Users extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'varchar'})
    username: string;

    @Column({type: 'varchar'})
    password: string;

    @Column({type: "varchar"})
    e_mail: string

    @Column({type: 'boolean', default: false})
    admin: boolean;

    @OneToMany(() => Commandes, commande => commande.user_id)
    commandes_id: Commandes[];

    static findAllUsers() {
        return this.createQueryBuilder("users")
        .getMany();
    };

    static findUserById(id) {
        return this.findOneBy({id: id});
    };

    static findUserByUsername(username) {
        return this.findOneBy({username: username});
    };

    static findUserByEmail(e_mail) {
        return this.findOneBy({e_mail: e_mail});
    };

    static createUser(username, password, e_mail, admin) {
        return this.createQueryBuilder()
        .insert()
        .into(Users)
        .values([
            { username: username, password: password, e_mail: e_mail, admin: admin}
        ])
        .returning("*")
        .execute();
    };

};
