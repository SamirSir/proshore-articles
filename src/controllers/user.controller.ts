import { Request, Response } from 'express';
import bcrypt from 'bcrypt';

import { UserService } from '../services';
import { userLoginValidator, userSignupValidator } from '../validators';
import { JWT } from '../utils';
import { jwtAuthSecret } from '../config';

export class UserController {
    public static async signup(req: Request, res: Response): Promise<any> {
        const inputParams = {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
        };
        const { error, value } = userSignupValidator.validate(inputParams);

        if (error) return res.status(500).json({ message: error.message });
        try {
            const salt = await bcrypt.genSalt(10);
            value.password = await bcrypt.hash(inputParams.password, salt);
            const user = await new UserService().create(value);
            return res.status(201).json({ message: 'User registered successfully' });
        } catch (error: any) {
            return res.status(500).json({ message: error.message });
        }
    }

    public static async login(req: Request, res: Response): Promise<any> {
        const inputParams = {
            email: req.body.email,
            password: req.body.password,
        };
        const { error, value } = userLoginValidator.validate(inputParams);

        if (error) return res.status(500).json({ message: error.message });
        const salt = await bcrypt.genSalt(10);
        value.password = await bcrypt.hash(inputParams.password, salt);
        try {
            const user = await new UserService().findOne({ email: inputParams.email });
            if (!user) return res.status(404).json({ message: 'User not found' });

            const isMatch = await bcrypt.compare(inputParams.password, user.password);
            if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

            const accessToken = JWT.sign({ id: user.id, email: user.email }, jwtAuthSecret.access);
            return res.status(200).json({ message: 'User logged in successfully', data: { accessToken } });
        } catch (error: any) {
            return res.status(500).json({ message: error.message });
        }
    }
}
