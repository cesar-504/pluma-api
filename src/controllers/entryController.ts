import { Next, Request, Response } from 'restify';
import * as Sequealize from 'sequelize';
import { EntryAttributes, EntryInstance } from '../models/entryModel';
import { models } from '../models/index';
import { sequelize } from '../models/index';
import { IParkingAttributes, IParkingInstance } from '../models/parkingModel';
import RestController from './restController';
interface IAccessRequest {
    idEntry: number;
    idUser: number;
    action: string;
}
interface IAccessReply {
    idEntry: number;
    auth: boolean;
    userId?: number;
    ioId?: number;
    error?: string;
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
        if (!request.action || !request.idEntry ) {
            return res.send(403, {
                        auth: false,
                        error: `invalid AccessRequest`,
                    }as IAccessReply);
        }
        if (!request || request.action !== 'access') {
            return res.send(403, {
                        auth: false,
                        error: `Action ${request.action} is not valid`,
                    }as IAccessReply);
        }

        try {
            let entry = await this._model.findById(request.idEntry, {include: [models.Parking]});
            if (!entry) {
                return res.send(404, {
                        idEntry: request.idEntry,
                        auth: false,
                        error: 'Entry not found',
                    }as IAccessReply);
            }
            if (!entry.dataValues.open) {
                return res.send(403, {
                        auth: false,
                        error: 'Entry is not open',
                    }as IAccessReply);
            }
            let parking  = (entry.dataValues as any).Parking.dataValues ;
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
            let user = await models.User.findById(request.idUser || 0);
            if (parking.requireID) {
                if (!user) {
                    return res.send(403, {
                        auth: false,
                        error: 'User not found',
                        userId : request.idUser || null,
                    }as IAccessReply);
                }

            }

            // let t = await sequelize.transaction();
            try {
                let p = await models.Parking.findById(entry.dataValues.ParkingId);
                await p.increment('currentlyOccupied');
                if (user) {
                    if (user.dataValues.currentLocationId) {
                        return res.send(403, {
                            auth: false,
                            error: 'The user is in a Parking: ' + p.dataValues.name,
                            userId : request.idUser || null,
                        }as IAccessReply);
                    }
                    user.dataValues.currentLocationId = p.getDataValue('id');
                    await models.User.update(user.dataValues, {where: {id: user.getDataValue('id')}});
                    // console.log(user.dataValues);
                }
                let ioReg = await models.IORegistry.create({
                        typeIO: 'access',
                        EntryId: request.idEntry,
                        UserId: request.idUser,
                });
               // t.commit();
                return res.send(200, {
                        auth: true,
                        error: null,
                        ioId: (ioReg.getDataValue('id') as number),
                        userId: (request.idUser) ? (request.idUser || null) : null,
                    }as IAccessReply);
            }catch (error) {
               // t.rollback();
               console.log(error);
               throw(error);
            }

        }catch (error) {
            return res.send(error);
        }

    }
    exit = async(req: Request, res: Response) => {
        let request: IAccessRequest = req.body;
        if (!request.action || !request.idEntry ) {
            return res.send(403, {
                        auth: false,
                        error: `invalid AccessRequest`,
                    }as IAccessReply);
        }
        if (!request || request.action !== 'exit') {
            return res.send(403, {
                        auth: false,
                        error: `Action ${request.action} is not valid`,
                    }as IAccessReply);
        }
        try {
            let entry = await this._model.findById(request.idEntry, {include: [models.Parking]});
            if (!entry) {
                return res.send(404, {
                        idEntry: request.idEntry,
                        auth: false,
                        error: 'Entry not found',
                    }as IAccessReply);
            }
            if (!entry.dataValues.open) {
                return res.send(403, {
                        auth: false,
                        error: 'Entry is not open',
                    }as IAccessReply);
            }
            let parking  = (entry.dataValues as any).Parking.dataValues ;
            let user = await models.User.findById(request.idUser || 0);
            if (parking.requireID) {
                if (!user) {
                    return res.send(403, {
                        auth: false,
                        error: 'User not found',
                        userId : request.idUser || null,
                    }as IAccessReply);
                }

            }
            try {
                let p = await models.Parking.findById(entry.dataValues.ParkingId);
                await p.decrement('currentlyOccupied');
                if (user) {
                    if (user.dataValues.currentLocationId !== p.getDataValue('id')) {
                        return res.send(403, {
                            auth: false,
                            error: 'The user is not  in this Parking ',
                            userId : request.idUser || null,
                        }as IAccessReply);
                    }
                    user.dataValues.currentLocationId = null;
                    await models.User.update(user.dataValues, {where: {id: user.getDataValue('id')}});
                    // console.log(user.dataValues);
                }
                let ioReg = await models.IORegistry.create({
                        typeIO: 'exit',
                        EntryId: request.idEntry,
                        UserId: request.idUser,
                });
               // t.commit();
                return res.send(200, {
                        auth: true,
                        error: null,
                        ioId: (ioReg.getDataValue('id') as number),
                        userId: (request.idUser) ? (request.idUser || null) : null,
                    }as IAccessReply);
            }catch (error) {
               // t.rollback();
               console.log(error);
               throw(error);
            }
        } catch (error) {
            return res.send(error);
        }
    }
}