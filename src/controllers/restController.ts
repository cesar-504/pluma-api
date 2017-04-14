import * as jwt from 'jsonwebtoken';
import { Next, Request, Response } from 'restify';
import * as Sequelize from 'sequelize';
import {models} from '../models/index';
import { IParkingAttributes, IParkingInstance } from '../models/parkingModel';
import { UserAttributes } from '../models/userModel';
export default class RestController<TInstance, TAttributes> {
    constructor(protected _model: Sequelize.Model<TInstance, TAttributes>) {
    }
    async createToken(body: any) {
        try {
            return await jwt.sign('user', 'pass', {expiresIn: '7 days'});
        }catch (error) {
            console.log(error);
        }
    }
    async decodeToken(token: string) {
        try {
            return await jwt.verify(token, 'pass');
        }catch (error) {
            return error;
        }
    }

    find = async(req: Request, res: Response, options?: Sequelize.FindOptions) => {

        try {
            res.send(await this._model.all());
        }catch (error) {
            res.send(error);
        }

    }
    findByID = async (req: Request, res: Response, options?: Sequelize.FindOptions) => {
        try {
            let item = await this._model.findById(req.params.id);
            if (item) return res.send(item);
            return res.send(404, 'not found');

        }catch (error) {
            return res.send(error);
        }
    }
    create = async (req: Request, res: Response, options?: Sequelize.FindOptions) => {
        try {
             let item = await this._model.create(req.body );
             return res.send(201, item);
        }catch (error) {
            return res.send(error);
        }
    }
    update = async (req: Request, res: Response, options?: Sequelize.FindOptions) => {
        try {
            let item = await this._model.update(req.body as TAttributes , {where: {id: req.params.id}});
            console.log(item);
            if (item) return res.send(204);
            return res.send(404, 'not found');
    }catch (error) {
            return res.send(error);
        }
    }
    delete = async (req: Request, res: Response, options?: Sequelize.FindOptions) => {
        try {
            let item = await this._model.destroy({where: {id: req.params.id}});
            if (item) return res.send(204);
            return res.send(404, 'not found');
        }catch (error) {
            return res.send(error);
        }
    }

}
