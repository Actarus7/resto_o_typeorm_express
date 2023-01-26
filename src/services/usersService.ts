import { Users } from "../entity/User";
import { IUser } from "../types/userType";



export class UsersService {

    // RECUPERATION DE TOUS LES USERS
    async selectAllUsers(): Promise<IUser[]> {
        const users = await Users.findAllUsers();

        if (users) {
            return users;
        };

        return undefined;
    };

    // RECUPERATION D'UN User (par son Id)
    async selectUserById(user_id): Promise<IUser> {
        const user = await Users.findUserByEmail(user_id);

        if (user) {
            return user;
        };

        return user;
    };

    // RECUPERATION D'UN User (par son Username)
    async selectUserByUsername(username): Promise<IUser> {
        const user = await Users.findUserByUsername(username);

        if (user) {
            return user;
        };

        return user;
    };

    // RECUPERATION D'UN User (par son Email)
    async selectUserByEmail(e_mail): Promise<IUser> {
        const user = await Users.findUserByEmail(e_mail);

        if (user) {
            return user;
        };

        return user;
    };

    // CREATION D'UN NOUVEAU USER
    async addUser(username: string, password: string, e_mail: string, admin: boolean): Promise<IUser> {
        
        const user = await Users.createUser(username, password, e_mail, admin);
        
        if (user) {
            const newUser = await Users.findOneBy({id: user.raw[0].id});
            
            return newUser;
        };

        return undefined;
    };

};