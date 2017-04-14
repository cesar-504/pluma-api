import { Next, Request, Response } from 'restify';
import { EntryAttributes, EntryInstance } from '../models/entryModel';
import { models } from '../models/index';
import RestController from './restController';

interface IAccessReply {
    idEntry: number;
    auth: boolean;
    userId?: number;
    ioId?: number;
    error?: string;
}
interface IAccessRequest {
    idEntry: number;
    idUser: number;
    action: string;
}
export default class EntryController
    extends RestController<EntryInstance, EntryAttributes> {
        constructor() {
        super(models.Entry);
    }
    find = async(req: Request, res: Response) => {

        try {
            res.send(await this._model.all({include: [models.Parking]}));
        }catch (error) {
            res.send(error);
        }

    }

    access = async(req: Request, res: Response) => {
        let request: IAccessRequest = req.body;
        if (!request || request.action !== 'access') {
            return res.send(403, {
                        auth: false,
                        error: `Action ${request.action} is not valid`,
                    }as IAccessReply);
        }
        try {
            let item = await this._model.findById(request.idEntry, {include: [models.Parking]});
            if (!item) {
                return res.send(404, {
                        idEntry: request.idUser,
                        auth: false,
                        error: 'Entry not found',
                    }as IAccessReply);
            }
            if (!item.dataValues.open) {
                return res.send(403, {
                        auth: false,
                        error: 'Entry is not open',
                    }as IAccessReply);
            }
            let parking  = (item.dataValues as any).Parking ;
            console.log(parking);
            if (!parking.open) {
                return res.send(403, {
                        auth: false,
                        error: 'Parking is not open',
                    }as IAccessReply);
            }

            if (parking.capacity && parking.currentlyOccupied
                && parking.currentlyOccupied >= parking.capacity) {
                return res.send(403, {
                        auth: false,
                        error: 'Full parking ',
                    }as IAccessReply);
                }
            if (parking.requireID) {
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

    }