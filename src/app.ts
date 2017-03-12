
import * as fs from 'fs';
import * as restify from 'restify';
import { settings } from './config/config';
import {models, sequelize} from './models/index';
import routes from './routes/routes';
export let api = restify.createServer({
    name: settings.name,
});

restify.CORS.ALLOW_HEADERS.push('authorization');
api.use(restify.CORS());
api.pre(restify.pre.sanitizePath());
api.use(restify.acceptParser(api.acceptable));
api.use(restify.bodyParser());
api.use(restify.jsonp());
api.use(restify.queryParser());
api.use(restify.authorizationParser());
api.use(restify.fullResponse());

// require("./routes/routes")(api);

routes(api);
sequelize.sync({force: true}).then(() => {
  // Table created
  models.Parking.create({
    capacity: 100,
    name: 'estacionamiento1',
    open: true,
    requireID: false,
  });

  return models.Product.create({
    description: 'descripcion del producto1',
    name: 'producto1',
  });

});

api.listen(settings.port, function () {
  console.log(`INFO: ${settings.name} is running at ${api.url}`);
});
