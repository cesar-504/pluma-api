import * as Sequelize from 'sequelize';
import { Request,Response,Next } from 'restify';
class RestController<TInstance, TAttributes> {
    
    private model:Sequelize.Model<TInstance,TAttributes>;

    
    async find(req:Request,res:Response):Promise<TInstance[]>{
        try{
            return await this.model.findAll()
        }catch(error){
            return res.status(500).send(error);
        }
        
    }
    async findByID(req:Request,res:Response){
        try{
            let item = await this.model.findById(req.params.id);
            if(item) return res.send(item);
            return res.status(404);
            
        }catch(error){
            return res.status(500).send(error);
        }
    }
    async create(req:Request,res:Response){
        try{
             let item = await this.model.create(req.body)
             return res.status(201).send(item);
        }catch(error){
            return res.status(409).send(error);
        }
    }
    async update(req:Request,res:Response){
        try{
            let item =await this.model.update(req.body,{where:{id:req.params.id}})
            return res.status(200).send(item);
    }catch(error){
            return res.status(409).send(error);
        }
    }
    async delete(req:Request,res:Response){
        try{
             await this.model.destroy({where:{id:req.params.id}})
             return res.status(200);
        }catch(error){
            return res.status(500).send(error);
        }
    }
    
}