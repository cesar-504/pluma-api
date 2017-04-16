import * as restify from 'restify';
import { settings } from '../config/config';
import {models, sequelize} from '../models/index';

let api = restify.createServer({
    name: settings.name,
});

async function seed() {
  try{

    await sequelize.sync({force: true});
  // Table created
  // 20 Parkings
    for (let i = 1; i <= 20; i++) {
    await models.Parking.create({
      capacity: 100,
      currentlyOccupied: 0,
      name: 'estacionamiento ' + i,
      open: (i !== 2),
      requireID: false,
    });
    models.CostParking.create({
      hoursIni: 0.0,
      hoursEnd: 5,
      priceForHour: null,
      priceForRange: 5,
      usePriceForRange: true,
    });
    // 2 Entries
    for (let o = 1; o <= 2; o++) {
      models.Entry.create({
        name: 'entrada' + o,
        open: (o !== 2),
        ParkingId: i,
      });
    }
  }
      // 3user (1 admon)
    for (let e = 1; e <= 3; e++) {
    await models.User.create({
      active: true,
      credit: 100,
      email: 'user_' + e + '@mail.com',
      lastName: e.toString(),
      name: 'user',
      password: '123456789',
    });
    }
    await models.Administrator.create({
    UserId: 1,
  });

  }catch (error) {
    console.log(error);
  }

  // return models.Product.create({
  //   description: 'descripcion del producto1',
  //   name: 'producto1',
  // });

}
let time = Date.now();
seed();
console.log('\nTime:///////// ' + (Date.now() - time).toString());
