import { models } from '../models/index';
import { IORegistryAttributes, IORegistryInstance } from '../models/IORegistryModel';
import RestController from './restController';
export default class IORegistryController
    extends RestController<IORegistryInstance, IORegistryAttributes> {
        constructor() {
            super(models.IORegistry);
        }
}
