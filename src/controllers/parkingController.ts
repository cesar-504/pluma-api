import { Next, Request, Response } from 'restify';
import { models } from '../models/index';
import { IParkingAttributes, IParkingInstance } from '../models/parkingModel';
import RestController from './restController';

interface IAccessReply {
    auth: boolean;
    userId?: number;
    ioId?: number;
    error?: string;
}
interface IAccessRequest{
    idParking: number;
    idUser: number;
    action: string;
}
export default class ParkingController
    extends RestController<IParkingInstance, IParkingAttributes> {
    constructor() {
        super(models.Parking);
    }

    access = async(req: Request, res: Response) => {
        try {
            let item = await this._model.findById(req.params.id);
            if (!item) {
                return res.send(404, {
                        auth: false,
                        error: 'Parking not found',
                    }as IAccessReply);
            }
            if (!item.dataValues.open) {
                return res.send(403, {
                        auth: false,
                        error: 'Parking is not open',
                    }as IAccessReply);
            }
            if (item.dataValues.capacity && item.dataValues.currentlyOccupied
                && item.dataValues.currentlyOccupied >= item.dataValues.capacity) {
                return res.send(403, {
                        auth: false,
                        error: 'Full parking ',
                    }as IAccessReply);
                }
            if (item.dataValues.requireID) {
                let user = await models.User.findById(req.body.userId || 0);
                if (!user) {
                    return res.send(403, {
                        auth: false,
                        error: 'User not found',
                        userId : req.body.userId || null,
                    }as IAccessReply);
                }
            }
            let ioReg = await models.IORegistry.create({typeIO: 'in'});
            return res.send(200, {
                        auth: true,
                        error: null,
                        ioId: (ioReg.getDataValue('id') as number),
                        userId: (req.body) ? (req.body.userId || null) : null,
                    }as IAccessReply);

        }catch (error) {
            return res.send(error);
        }
    }
    exit = async(req: Request, res: Response) => {
        let asd = {
            auth: true,
            error: null,
        }as IAccessReply;

        let asd3 = <IAccessReply> {
            auth: true,
            error: null,
        }as IAccessReply;

    }
}
