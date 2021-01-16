import mongoose from 'mongoose';
import sanitize from 'express-mongo-sanitize';
import express from 'express';

import config from '../config';

import { MongoError } from 'mongodb';

const mongoOptions: mongoose.ConnectionOptions = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: true
};

const connect = (app: express.Application) => {
  mongoose.connect(config.mongo.url, mongoOptions)
    .then(() => {
      setSanitizer(app);
      console.log('Base de datos online');
    })
    .catch((err: any) => {
      console.log('No hay conexión con la base de datos');
    });
};

const disconnect = () => {
  mongoose.disconnect()
    .then((result) => {
      // console.log('Desconectado');
    })
    .catch((err: MongoError) => {
      // console.log({ err });
    });

};

const setSanitizer = (app: express.Application) => {
  app.use(sanitize({ replaceWith: '_' }))
}

export default { connect, disconnect }