import { Request, Response } from 'express';
import bcrypt from 'bcrypt';

import { UserService } from '../services';
import { userLoginValidator, userSignupValidator } from '../validators';
import { JWT } from '../utils';
import { jwtAuthSecret } from '../config';

export class UserController {
    public static async signup(req: Request, res: Response) {
        const inputParams = {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
        };
        const { error, value } = userSignupValidator.validate(inputParams);

        if (error) res.status(500).send(error.message);
        else {
            try {
                const salt = await bcrypt.genSalt(10);
                value.password = await bcrypt.hash(inputParams.password, salt);
                const user = await new UserService().create(value);
                res.status(201).send({ message: 'User registered successfully', data: user });
            } catch (error: any) {
                res.status(500).send({ message: error.message });
            }
        }
    }

    public static async login(req: Request, res: Response) {
        const inputParams = {
            email: req.body.email,
            password: req.body.password,
        };
        const { error, value } = userLoginValidator.validate(inputParams);

        if (error) res.status(500).send(error.message);
        else {
            const salt = await bcrypt.genSalt(10);
            value.password = await bcrypt.hash(inputParams.password, salt);
            try {
                const user = await new UserService().findOne({ email: inputParams.email });
                if (!user) res.status(404).send({ message: 'User not found' });

                const isMatch = await bcrypt.compare(inputParams.password, user.password);
                if (!isMatch) res.status(400).send({ message: 'Invalid credentials' });

                const accessToken = JWT.sign({ id: user.id, email: user.email }, jwtAuthSecret.access);
                res.status(200).send({ message: 'User logged in successfully', data: { accessToken } });
            } catch (error: any) {
                res.status(500).send({ message: error.message });
            }
        }
    }
}
