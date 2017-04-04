
import { Next, Request, Response, Server } from 'restify';
import * as sequelize from 'sequelize';
import AdministratorController from '../controllers/administratorController';
import IORegistryController from '../controllers/IORegistryController';
import { LoginController } from '../controllers/LoginController';
import ParkingController from '../controllers/parkingController';
import RestController from '../controllers/restController';
import UserController from '../controllers/userController';
export default function  (api: Server) {
    // api.get('/', async (req: Request, res: Response) => {
    //     try {
    //         return res.send(await models.Product.all());
    //     }catch (error) {
    //          return res.status(500).send(error);
    //     }
    // });
    api.get('/', (req: Request, res: Response) => {
        return res.send('Pluma Api');
    });
    let parking = new ParkingController();
    let login = new LoginController();
    createRest('/api/parkings/', parking , api);
    createRest('/api/administators/', new AdministratorController(), api);
    createRest('/api/users/', new UserController(), api);
    createRest('/api/io/', new IORegistryController(), api);

    api.get('/api/parkings/:id/access', parking.access);
    api.get('/api/login', login.login);
    api.get('/api/auth', login.auth);
}

function createRest<TI, TA>(route: string, ctr: RestController<TI, TA>, api: Server) {
    api.get(route, ctr.find);
    api.get(route + '/:id', ctr.findByID);
    api.post(route, (ctr.create));
    api.put(route + '/:id', ctr.update);
    api.del(route + '/:id', ctr.delete);
}
