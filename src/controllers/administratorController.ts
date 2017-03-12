import { AdministratorAttributes, AdministratorInstance } from '../models/administratorModel';
import { models } from '../models/index';
import RestController from './restController';
export default class AdministratorController
    extends RestController<AdministratorInstance, AdministratorAttributes> {
        constructor() {
            super(models.Administrator);
        }
}
