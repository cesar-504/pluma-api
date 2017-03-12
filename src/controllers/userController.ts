import { models } from '../models/index';
import { UserAttributes, UserInstance } from '../models/userModel';
import RestController from './restController';
export default class UserController
    extends RestController<UserInstance, UserAttributes> {
        constructor() {
            super(models.User);
        }
}
