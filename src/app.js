"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const restify = require("restify");
const config_1 = require("./config/config");
const index_1 = require("./models/index");
const routes_1 = require("./routes/routes");
exports.api = restify.createServer({
    name: config_1.settings.name,
});
restify.CORS.ALLOW_HEADERS.push('authorization');
exports.api.use(restify.CORS());
exports.api.pre(restify.pre.sanitizePath());
exports.api.use(restify.acceptParser(exports.api.acceptable));
exports.api.use(restify.bodyParser());
exports.api.use(restify.jsonp());
exports.api.use(restify.queryParser());
exports.api.use(restify.authorizationParser());
exports.api.use(restify.fullResponse());
// require("./routes/routes")(api);
routes_1.default(exports.api);
index_1.sequelize.sync({ force: true }).then(() => {
    // Table created
    index_1.models.Parking.create({
        capacity: 100,
        name: 'estacionamiento1',
        open: true,
        requireID: false,
    });
    return index_1.models.Product.create({
        description: 'descripcion del producto1',
        name: 'producto1',
    });
});
exports.api.listen(config_1.settings.port, function () {
    console.log(`INFO: ${config_1.settings.name} is running at ${exports.api.url}`);
});
//# sourceMappingURL=app.js.map