import { Next, Request, Response } from 'restify';
import * as Sequelize from 'sequelize';
import {models} from '../models/index';
export default class RestController<TInstance, TAttributes> {
    private model: Sequelize.Model<TInstance, TAttributes>;
    constructor(model: Sequelize.Model<TInstance, TAttributes>) {
        this.model = model;
        console.log(this.model.all());
    }
    public async find(req: Request, res: Response) {
        console.log(this.model);
        try {
            
            return  res.send(await models.Parking.all());
        }catch (error) {
            console.log(error);
            return await res.status(500).send(error);
        }

    }
    public async findByID(req: Request, res: Response) {
        try {
            let item = await this.model.findById(req.params.id);
            // tslint:disable-next-line:curly
            if (item) return res.send(item);
            return res.status(404);

        }catch (error){
            return res.status(500).send(error);
        }
    }
    public async create(req: Request, res: Response){
        try {
             let item = await this.model.create(req.body);
             return res.status(201).send(item);
        }catch (error){
            return res.status(409).send(error);
        }
    }
    public async update(req: Request, res: Response) {
        try {
            let item = await this.model.update(req.body, {where: {id: req.params.id}});
            return res.status(200).send(item);
    }catch (error){
            return res.status(409).send(error);
        }
    }
    public async delete(req: Request, res: Response){
        try {
             await this.model.destroy({where: {id: req.params.id}});
             return res.status(200);
        }catch (error){
            return res.status(500).send(error);
        }
    }

}