
import { Next, Request, Response, Server } from 'restify';
import * as sequelize from 'sequelize';
import AdministratorController from '../controllers/administratorController';
import EntryController from '../controllers/entryController';
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
    let entry = new EntryController();
    let login = new LoginController();
    createRest('/api/parkings/', new ParkingController() , api);
    createRest('/api/administrators/', new AdministratorController(), api);
    createRest('/api/users/', new UserController(), api);
    let ios = new IORegistryController();
    api.get('/api/ios', ios.find);
    api.get('/api/ios/:id', ios.findByID);
    createRest('/api/entries/', entry, api);
    api.post('/api/parkings/access', entry.access);
    api.post('/api/entries/access', entry.access);
    api.post('/api/parkings/exit', entry.exit);
    api.post('/api/entries/exit', entry.exit);
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
