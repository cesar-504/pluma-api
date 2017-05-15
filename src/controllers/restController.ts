import * as jwt from 'jsonwebtoken';
import { Next, Request, Response } from 'restify';
import * as Sequelize from 'sequelize';
import { auth } from '../controllers/LoginController';
import {models} from '../models/index';
import { IParkingAttributes, IParkingInstance } from '../models/parkingModel';
import { UserAttributes } from '../models/userModel';
export default class RestController<TInstance, TAttributes> {
    constructor(protected _model: Sequelize.Model<TInstance, TAttributes>) {
    }

    async parseParamenters( params: any ): Promise<Sequelize.FindOptions> {
        let count = parseInt(params.count, 10) || 100;
        if (count > 100) count = 100;
        let max_id = parseInt(params.max_id, 10);
        let since_id = parseInt(params.since_id, 10);
        let orderParams = (params.order) ? params.order.replace(/\s+/g, '').split(',') as string[] : undefined ;
        let descParams = (params.desc) ? params.desc.replace(/\s+/g, '').split(',') as string[] : undefined ;
        if (count && isNaN(count)) throw  new Error('incorrect format: count = ' + count);
        if (max_id && isNaN(max_id)) throw  new Error( 'incorrect format: max_id = ' + max_id);
        if (since_id && isNaN(since_id)) throw  new Error( 'incorrect format: since_id = ' + since_id);
        let whereOp = {
            id: {$and: {} as any },
        };
        let orderOp: string[][] = [];
        if (orderParams)
            for (let i = 0; i < orderParams.length; i++) {
                orderOp[i] = [orderParams[i]];

            }
        if (descParams)
        for (let p of descParams ){
            let b = false;
            orderOp.forEach((e) => {
                if (e[0] === p) {
                    b = true;
                    e.push('DESC');
                }
            });
            if (!b) orderOp.push([p, 'DESC']);
        }
        if (max_id) {
            whereOp.id.$and.$lt = max_id;
            if (!since_id) {

                whereOp.id.$and.$gte = max_id - count;
            }
        }
        if (since_id) {
            if (!max_id)
                whereOp.id.$and.$lt = since_id + count;
            whereOp.id.$and.$gte = since_id;
        }
        let findOp: Sequelize.FindOptions = {
            limit: count ,
            order: orderOp,
            where: whereOp,
        };
        return findOp;

    }

    last = async(req: Request, res: Response, options?: Sequelize.FindOptions) => {
        if (!req.params.desc) req.params.desc = 'id';
        return await this.find(req, res, options);

    }
    find = async(req: Request, res: Response, options?: Sequelize.FindOptions) => {
        // let u = await auth(req.headers.authorization);
        // if (!u.user || !u.adm) return res.send(401, {error: 'Unauthorized'});
        try {
            res.send(await this._model.all(await this.parseParamenters(req.params)));
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
