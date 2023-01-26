// Imports
import { Request, Response } from "express";
import { UsersService } from "../services/usersService";
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';

// Exports - Déclarations
const usersService = new UsersService();
const accessTokenSecret = process.env.TOKEN_SECRET as string;


export class UsersController {

    async getAllUsers(req: Request, res: Response) {
        try {
            const users = await usersService.selectAllUsers();

            res.status(200).json({
                status: "OK",
                message: "Users récupérés",
                data: users
            });
        }
        catch (error) {
            console.log((error.stack));
            
            res.status(500).json({
                status: "FAIL",
                message: "Erreur serveur ou inconnue",
                data: null
            });
        };
    };

    async register(req: Request, res: Response) {
        const { username, password, e_mail, admin} = req.body;

        const error = {
            statusCode: 400,
            message: '',
            status: 'FAIL',
            data: null
        };

        if (!username && !(typeof (username) === 'string')) {
            error.message = "Username manquant ou Type de donnée incorrect (attendu 'String')";
        }

        else if (!password && !(typeof (password) != 'string')) {
            error.message = "Password manquant ou Type de donnée incorrect (attendu 'String')";
        }

        else if (!e_mail && !(typeof (e_mail) != 'string')) {
            error.message = "Email manquant ou Type de donnée incorrect (attendu 'String')";
        }

        if (error.message) {
            res.status(error.statusCode).json({
                status: 'FAIL',
                message: error.message,
                data: null
            });

            return;
        };

        const isUsernameExists = await usersService.selectUserByUsername(username);
        const isEmailExists = await usersService.selectUserByEmail(e_mail);

        if (isUsernameExists != undefined) {
            error.message = "Username déjà existant";
        }

        else if (isEmailExists != undefined) {
            error.message = "E_mail déjà existant";
        }

        if (error.message) {
            res.status(error.statusCode).json({
                status: 'FAIL',
                message: error.message,
                data: null
            });

            return;
        };

        bcrypt.hash(password, 10, async (err, password) => {
            try {
                const user = await usersService.addUser(username, password, e_mail, admin);

                res.status(200).json({
                    status: 'OK',
                    message: 'User créé !',
                    data: user
                });
            }

            catch (err: any) {
                console.log(err.stack);

                res.status(500).json({
                    status: 'FAIL',
                    message: 'Erreur serveur ou inconnue',
                    data: null
                });
            };
        });



    };

    async login(req: Request, res: Response) {
        const { username, password } = req.body;

        const error = {
            statusCode: 400,
            message: '',
            status: 'FAIL',
            data: null
        };

        if (!username && !(typeof (username) === 'string')) {
            error.message = "Username manquant ou Type de donnée incorrect (attendu 'String')";
        }

        else if (!password && !(typeof (password) === 'string')) {
            error.message = "Password manquant ou Type de donnée incorrect (attendu 'String')";
        }

        if (error.message) {
            res.status(error.statusCode).json({
                status: 'FAIL',
                message: error.message,
                data: null
            });

            return;
        };

        try {
            const user = await usersService.selectUserByUsername(username);

            if (user === null) {
                res.status(400).json({
                    status: 'FAIL',
                    message: "Username unknown",
                    data: null
                });

                return;
            }

            const accessToken: string = jwt.sign({ userId: user.id }, accessTokenSecret);

            bcrypt.compare(password, user.password, async (err: any, result: boolean) => {

                if (result == true) {
                    res.status(200).json({
                        status: 'SUCCESS',
                        message: 'Acces granted',
                        data: { token: accessToken, admin: user.admin }
                    });
                }

                else {
                    res.status(403).json({
                        status: 'FAIL',
                        message: 'Acces denied - Wrong password',
                        data: null
                    });
                };
            });
        }

        catch (err: any) {
            console.log(err.stack);

            res.status(500).json({
                status: 'FAIL',
                message: "Erreur serveur ou inconnue",
                data: null
            });
        };
    };

};


