import { Request, Response } from 'express'
import { bcrypt } from 'bcrypt';
import { jwt } from 'jsonwebtoken';
import { Users } from './entity/Users';
import { dotenv } from 'dotenv';
dotenv.config();

const SALT_ROUND = 10;
const SECRET_KEY = "   ";

export const register = async (req: Request, res: Response) => {
    const { username, password } = req.body;
    console.log(req.body);

    const existingUser = await Users.findOne({
        username
    });

    if (existingUser) {
        res.status(400).send({
            message: "username already taken"
        })
    } else {
        const salt = await bcrypt.genSalt(SALT_ROUND);
        const hashPassword = await bcrypt.hash(password, salt);

        const user = await Users.create({
            username,
            password, hashPassword
        });

        await Users.save(user);
        res.send({ message: 'User created' });
    }
};

export const login = async (req: Request, res: Response) => {
    const { username, password } = req.body;
    const user = await Users.findOne({
        username
    });

    if (!user) {
        res.status(400).send({ message: 'invalid username or password' });
    }
    else {
        const isSuccess = await bcrypt.compare(password, user.password);

        if (isSuccess) {
            const payload = ({
                id: user.id,
                name: user.name
            }
            )


            const token = jwt.sign(payload, SECRET_KEY, { expireIn: 3600 });
            res.status(200).send({ token });

        } else {
            res.status(400).send({ message: 'Invalid username or password' });
        }
    }
}