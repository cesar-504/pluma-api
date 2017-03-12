
import { Next, Request, Response, Server } from 'restify';
import * as sequelize from 'sequelize';
import ParkingController from '../controllers/parkingController';
import {models} from '../models/index';
import {ProductAttributes, ProductInstance} from '../models/productModel';
export default function  (api: Server) {
    api.get('/', async (req: Request, res: Response) => {
        try {
            return res.send(await models.Product.all());
        }catch (error) {
             return res.status(500).send(error);
        }
    });
    let p = new ParkingController();

    api.get('/api', p.find);
    api.get('/api/:id', p.findByID);
    api.post('/api', (p.create));
    api.put('/api/:id', p.update);
    api.del('/api/:id', p.delete);

}
