import * as jwt from 'jsonwebtoken';
import { Next, Request, Response } from 'restify';
import * as Sequelize from 'sequelize';
import {models} from '../models/index';

// tslint:disable-next-line:interface-name

export
/**
 * LoginController
 */
class LoginController {
    // constructor() {
    // }
    auth = async(req: Request, res: Response) => {
         let tokens = (req.headers.authorization as string).trim().split(/\s+/);

         console.log(tokens);
         if (tokens.length !== 2 || tokens[0].toLowerCase() !== 'bearer') return res.send(false);
         let decodeToken = await jwt.verify(tokens[1], 'pass');
         console.log(decodeToken);
         return res.send(decodeToken);
    }
    login = async(req: Request, res: Response) => {
        return res.send(await jwt.sign({user: 123, type:  'adm'}, 'pass'));
    }
}