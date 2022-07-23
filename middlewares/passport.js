// import passport from 'passport'
// import { Strategy } from 'passport-local'
// import { usuariosDao } from '../daos/index.js';
// import MongoStore from 'connect-mongo';
// import session from 'express-session';
// import express from 'express';
// import flash from 'connect-flash';
// // import { obtenerUsuarioPorId } from '../persistencia/usuarios.js'
// const advancedOptions = { useNewUrlParser: true, useUnifiedTopology: true };

// const app = express();

// passport.serializeUser(function(user, done) {
//     done(null, user);
// });

// passport.deserializeUser(function(obj, done) {
//     done(null, obj);
// });



// // session({
// //     store: MongoStore.create({
// //         mongoUrl: `mongodb+srv://root:1234@cluster0.5xw3itz.mongodb.net/?retryWrites=true&w=majority`,
// //         mongoOptions: advancedOptions
// //     }),
// //     secret: '123456789',
// //     resave: true,
// //     saveUninitialized: true
// // })

// // passport.initialize();
// // passport.session();


// // import { registrarUsuario } from '../api/usuariosApi.js'
// // import { autenticar } from '../api/authApi.js'

// passport.use('login', new Strategy({ 
//     usernameField: 'nombre',
//     passwordField: 'contraseña',
// },
//     async (username, password, done) => {
//         console.log('funcionando')
//         let usuarioEncontrado = 0;
//         const obj = await usuariosDao.getAll();
//         console.log(username);
//         console.log(password);
//         for (let index = 0; index < obj.length; index++) {
//             const usuario = await obj[index];
//             console.log(usuario.nombre);
//             console.log(usuario.contraseña);
//             if(await usuario.nombre == username){
//                 usuarioEncontrado++;
//                 if(await usuario.contraseña == password){
//                     usuarioEncontrado++;
//                 }
//             }
//             console.log(usuarioEncontrado);
//         }
//         if(usuarioEncontrado == 2){
//             done(null, { id: 1, nombre: username, contraseña: password})
//         }else{
//             done(null, false)
//         }
//     }))



// // export const passportMiddleware = passport.initialize();

// // // opcional =====================================================

// // passport.serializeUser(function(user, done) {
// //     done(null, user);
// // });

// // passport.deserializeUser(function(obj, done) {
// //     done(null, obj);
// // });

// // export const passportSessionHandler = passport.session();