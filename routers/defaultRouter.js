import express from 'express';
import { Router } from 'express';
import { usuariosDao } from '../daos/index.js';
import MongoStore from 'connect-mongo';
import session from 'express-session';
import controladorUserMongoDb from '../controladores/controladorUserMongoDb.js';
import flash from 'connect-flash';
import passport from 'passport';
// import { passportMiddleware } from '../middlewares/passport.js';
// import { passportSessionHandler } from '../middlewares/passport.js';





const routerDefault = new Router();


routerDefault.use(express.json());
routerDefault.use(express.urlencoded({ extended: true }));

// routerDefault.get('/register/', controladorUserMongoDb.getAll);
// routerDefault.post('/register/', passport.authenticate('local', { failureRedirect: '/fail-registro', failureFlash: true}), controladorUserMongoDb.create);
routerDefault.get('/registro', controladorUserMongoDb.registroGet);
routerDefault.post('/login', controladorUserMongoDb.loginPost);
routerDefault.get('/login', controladorUserMongoDb.loginGet);
routerDefault.get('/inicio', controladorUserMongoDb.inicioGet);
routerDefault.post('/inicio', passport.authenticate('login', { failureRedirect: '/fail-login', failureFlash: true}), controladorUserMongoDb.inicioPost);




export default routerDefault;


