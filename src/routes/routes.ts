
import { Server,Request,Response,Next } from 'restify';
import * as sequelize from 'sequelize'
import {models} from '../models/index'
import {ProductAttributes, ProductInstance} from '../models/productModel'
export default function  (api:Server){
    api.get('/',async (req:Request,res:Response)=>{
        try{
            return res.send(await models.Product.all());
        }catch(error){
             return res.status(500).send(error);
        }
    });
}
