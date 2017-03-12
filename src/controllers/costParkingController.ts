import { CostParkingAttributes, CostParkingInstance } from '../models/costParkingModel';
import { models } from '../models/index';
import RestController from './restController';
export default class CostParkingController
    extends RestController<CostParkingInstance, CostParkingAttributes> {
        constructor() {
            super(models.CostParking);
        }
}
