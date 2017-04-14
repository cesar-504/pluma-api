
import * as fs from 'fs';
import * as restify from 'restify';
import { Next, Request, Response } from 'restify';
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

// api.use((req: Request, res: Response, next: Next ) => {
//   console.log('MidleWare');
//   next();
// });
// require("./routes/routes")(api);

routes(api);

api.listen(settings.port, () => {
  console.log(`INFO: ${settings.name} is running at ${api.url}`);
});
sequelize.sync().then(() => {
  // Table created

  

  });