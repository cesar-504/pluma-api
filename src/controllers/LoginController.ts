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

}

export async function auth(req: Request, res: Response, next: Next) {
    let text = req.authorization;
    console.log('auth ' + text);
    next();
}