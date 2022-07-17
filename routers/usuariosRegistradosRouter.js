import express from 'express';
import { Router } from 'express';
import { usuariosDao } from '../daos/index.js';
import MongoStore from 'connect-mongo';
import session from 'express-session';

import passport from 'passport';

import { Strategy } from 'passport-local'

// passport.serializeUser(function(user, done) {
//     done(null, user);
// });

// passport.deserializeUser(function(obj, done) {
//     done(null, obj);
// });

// const app = express()

// app.use(passport.initialize());
// app.use(passport.session());

// const advancedOptions = { useNewUrlParser: true, useUnifiedTopology: true }

// app.use(session({
//     store: MongoStore.create({
//         mongoUrl: `mongodb+srv://root:1234@cluster0.5xw3itz.mongodb.net/?retryWrites=true&w=majority`,
//         mongoOptions: advancedOptions
//     }),
//     secret: '123456789',
//     resave: true,
//     saveUninitialized: true
// }))

// passport.use('local', new Strategy({ 
//     // passReqToCallback: true,
//     usernameField: 'nombre',
//     passwordField: 'contraseña',
// },
//     async (username, password, done)=>{
//         console.log('hola');
//         console.log(await usuariosDao.getAll());
//         console.log("LocalStrategy working...");
//         // const nombre = req.nombre;
//         // const contraseña = req.contraseña;
//         console.log(username);
//         console.log(password);
//         return done(null, { id: 1, nombre: username, contraseña: password});
//     }
// ))


import controladorUserMongoDb from '../controladores/controladorUserMongoDb.js';

const routerUsuariosRegistrados = new Router();

routerUsuariosRegistrados.use(express.json());
routerUsuariosRegistrados.use(express.urlencoded({ extended: true }));

routerUsuariosRegistrados.get('/register/', controladorUserMongoDb.getAll);
routerUsuariosRegistrados.post('/register/', passport.authenticate('local', { failureRedirect: '/fail-registro', failureFlash: true}), controladorUserMongoDb.create);



export default routerUsuariosRegistrados;