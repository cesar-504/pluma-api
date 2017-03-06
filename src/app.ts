
import * as fs from 'fs';
import * as restify from 'restify';
import { settings } from './config/config';
import routes from './routes/routes';
import {sequelize,models} from "./models/index";
export let api = restify.createServer({
    name:settings.name
});

console.log("hola");

restify.CORS.ALLOW_HEADERS.push('authorization');
api.use(restify.CORS());
api.pre(restify.pre.sanitizePath());
api.use(restify.acceptParser(api.acceptable));
api.use(restify.bodyParser());
api.use(restify.queryParser());
api.use(restify.authorizationParser());
api.use(restify.fullResponse());


//require("./routes/routes")(api);

routes(api); 
sequelize.sync({force: true}).then(() => {
  // Table created
  return models.Product.create({
    name:"producto1",
    description:"descripcion del producto1"
  });
});






api.listen(settings.port, function () {
  console.log(`INFO: ${settings.name} is running at ${api.url}`);
});