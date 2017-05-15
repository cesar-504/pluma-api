import * as Bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { Next, Request, Response } from 'restify';
import * as Sequelize from 'sequelize';
import { keys } from '../config/config';
import {models} from '../models/index';
// tslint:disable-next-line:interface-name
export interface AuthResult {
    user?: number;
    adm?: boolean;
    errorCode?: number;
    error?: string;
}

export async function  auth(authStr: string): Promise<AuthResult> {
    try {
         let tokens = authStr.trim().split(/\s+/);

         console.log(tokens);
         if (tokens.length !== 2 || tokens[0].toLowerCase() !== 'bearer')
            return {errorCode: 400, error: 'format error in authentication string'} ;
         let decodeToken = await jwt.verify(tokens[1], keys.jwt_key);
         console.log(decodeToken);
         return decodeToken;
        }catch (error) {
            if (error.message === 'jwt malformed')
                return {errorCode: 400 , error: ` ${error.name}: ${error.message} ` };
            else
                return {errorCode: 403 , error: ` ${error.name}: ${error.message} ` };
        }
}
export
/**
 * LoginController
 */
class LoginController {
    // constructor() {
    // }

    login = async(req: Request, res: Response) => {
        try {
            if (!req.body) return res.send(400, {error: 'request format error'});
            let emailStr = req.body.email;
            let passwordStr = req.body.password;
            if (emailStr === undefined || passwordStr === undefined)
                return res.send(400, {error: 'request format error'});
            let user = await models.User.findOne({where: {email: emailStr} });
            let passTest = await Bcrypt.compare(passwordStr, user.dataValues.password);
            if (!user || !passTest) res.send(403, {error: 'User or password incorrect'});
            let adm = await models.Administrator.findById(user.getDataValue('id'));
            if (adm)
                return res.send({jwt: await jwt.sign({user: user.getDataValue('id'), adm:  true}, keys.jwt_key)});
            else
                return res.send({jwt: await jwt.sign({user: user.getDataValue('id'), adm: false}, keys.jwt_key)});
        }catch (error) {
            res.send(500, error.message);
        }
    }
}
