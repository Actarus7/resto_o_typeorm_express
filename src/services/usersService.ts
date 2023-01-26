import { Users } from "../entity/User";



export class UsersService {

    async selectAllUsers() {
        const users = await Users.findAllUsers();

        if (users) {
            return users;
        };

        return undefined;
    };

    async selectUserById(user_id) {
        const user = await Users.findUserByEmail(user_id);

        if (user) {
            return user;
        };

        return user;
    };

    async selectUserByUsername(username) {
        const user = await Users.findUserByUsername(username);

        if (user) {
            return user;
        };

        return user;
    };

    async selectUserByEmail(e_mail) {
        const user = await Users.findUserByEmail(e_mail);

        if (user) {
            return user;
        };

        return user;
    };

    async addUser(username: string, password: string, e_mail: string, admin: boolean) {
        const user = await Users.createUser(username, password, e_mail, admin);

        if (user) {
            return user;
        };

        return undefined;
    };

};