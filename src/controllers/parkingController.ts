import { models } from '../models/index';
import { ParkingAttributes, ParkingInstance } from '../models/parkingModel';
import RestController from './restController';
export default class ParkingController
    extends RestController<ParkingInstance, ParkingAttributes> {
        constructor(){
            super(models.Parking);
        }
}
