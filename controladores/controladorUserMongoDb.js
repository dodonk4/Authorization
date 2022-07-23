// import { usuariosDao } from '../daos/index.js';
// import Contenedor from '../public/productos.js';
// import Mensajeria from '../public/mensajes.js';
// // import { passportMiddleware } from '../middlewares/passport.js';
// // import { passportSessionHandler } from '../middlewares/passport.js';
// import session from 'express-session';




// const caja = new Contenedor();
// const mensajeriaANormalizar = new Mensajeria('../public/mensajesANormalizar.txt');

// const controladoresUsuarios = {
//     getAll: async (req, res) => {
//         res.json(await usuariosDao.getAll());
//     },
//     create: async(req, res) => {
//         res.json(await usuariosDao.save(req.body));
//     },
//     registroGet: (req, res)=>{res.render('inicio');
//     },
//     loginPost: async (req,res)=>{
//         if(req.body.nombre){
//            res.render('registrado', {nombre: req.body.nombre} )
//            await usuariosDao.save(req.body);
//          }
//          else{
//            res.send('login failed')
//          }
//     },
//     loginGet: (req,res)=>{
//         res.render('registrado')
//     },
//     inicioGet: async (req, res)=>{
//         console.log(await caja.obtenerTodos());
//         if (req.session) {
//             await caja.crearTabla();
//             await caja.obtenerTodos();
//             let productos = await caja.obtenerTodos();
//             let mensajes = await mensajeriaANormalizar.obtenerTodos();
//             res.render('logueado', { titulo: 'PRODUCTO', titulo2: 'PRECIO', titulo3: 'THUMBNAIL', productos, mensajes, nombre: req.session.passport.user.nombre});
//         } else {
//             res.render('redireccion');
//         }
        
//     },
//     inicioPost: async (req, res)=>{
//         req.session.user = req.body.nombre;
//         req.session.password = req.body.contraseña;
//         req.session.cookie.maxAge = 60000;
//         await caja.obtenerTodos();
//         let productos = await caja.obtenerTodos();
//         let mensajes = await mensajeriaANormalizar.obtenerTodos();
//         res.render('logueado', { titulo: 'PRODUCTO', titulo2: 'PRECIO', titulo3: 'THUMBNAIL', productos, mensajes, nombre: req.session.passport.user.nombre});
    
//     }
// }

// export default controladoresUsuarios;