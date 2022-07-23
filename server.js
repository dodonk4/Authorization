import express from 'express';

import { Server as HttpServer } from 'http';

import { Server as IOServer } from 'socket.io';

import session from 'express-session';

import Contenedor from './public/productos.js'

import Mensajeria from './public/mensajes.js'

import MongoStore from 'connect-mongo';

import bodyParser from 'body-parser';

import { engine } from 'express-handlebars';

import passport from 'passport';

import { Strategy } from 'passport-local';

import flash from 'connect-flash';

import bcrypt from 'bcrypt';

// import routerDefault from './routers/defaultRouter.js';

import { usuariosDao } from './daos/index.js';

const caja = new Contenedor();
const mensajeriaANormalizar = new Mensajeria('./public/mensajesANormalizar.txt');

const advancedOptions = { useNewUrlParser: true, useUnifiedTopology: true }
const app = express()

app.engine('handlebars', engine({defaultLayout: "index"}));
app.set('view engine', 'handlebars');
app.set("views", "./public/views");
app.use(express.json())
app.use(express.static('public'))
app.use(express.urlencoded())
app.use(bodyParser.urlencoded());
app.use(flash());
// app.use(routerDefault);
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);
export default io;

app.use(session({
    store: MongoStore.create({
        mongoUrl: `mongodb+srv://root:1234@cluster0.5xw3itz.mongodb.net/?retryWrites=true&w=majority`,
        mongoOptions: advancedOptions
    }),
    secret: '123456789',
    resave: true,
    saveUninitialized: true
}))


app.use(passport.initialize());
app.use(passport.session());


passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(obj, done) {
    done(null, obj);
});


passport.use('login', new Strategy({ 
    usernameField: 'nombre',
    passwordField: 'contraseña',
},
    async (username, password, done) => {
        let usuarioEncontrado = 0;
        const obj = await usuariosDao.getAll();
        console.log(username);
        console.log(password);
        
        for (let index = 0; index < obj.length; index++) {
            const usuario = await obj[index];
            let comparacion = bcrypt.compareSync(password, usuario.contraseña);
            if(comparacion === true){
                usuarioEncontrado++;
            }
            if(await usuario.nombre == username){
                usuarioEncontrado++;
            }
        }
        if(usuarioEncontrado == 2){
            done(null, { id: 1, nombre: username, contraseña: password})
        }else{
            done(null, false)
        }
    }))

    passport.use('registro', new Strategy({
        passReqToCallback: true,
        usernameField: 'nombre',
        passwordField: 'contraseña'
    },
        async (req, username, password, done) => {
            console.log(username);
            console.log(password);
            console.log(req.body);
            let salt = bcrypt.genSaltSync(8);
            let hash = bcrypt.hashSync(req.body.contraseña, salt);
            req.body.contraseña = hash;
                try {
                    if(await usuariosDao.checkForDoubleUser(req.body) === false){
                        done(null, null);
                    }else{
                        await usuariosDao.save(req.body);
                        done(null, req.body)
                    }
                } catch (error) {
                    done(error)
                }
        }))


app.get('/registro', (req, res)=>{
    res.render('inicio');
})


app.post('/login', passport.authenticate('registro', { failureRedirect: '/fail-registro', failureFlash: true}), async (req,res)=>{
     if(req.body.nombre){
        res.render('registrado', {nombre: req.body.nombre} )
      }
      else{
        res.send('login failed')
      }
})


app.get('/login',(req,res)=>{
    res.render('registrado')
})

app.get('/inicio', async (req, res)=>{
    if (req.session.passport) {
        await caja.crearTabla();
        await caja.obtenerTodos();
        let productos = await caja.obtenerTodos();
        let mensajes = await mensajeriaANormalizar.obtenerTodos();
        res.render('logueado', { titulo: 'PRODUCTO', titulo2: 'PRECIO', titulo3: 'THUMBNAIL', productos, mensajes, nombre: req.session.passport.user.nombre});
    } else {
        res.render('redireccion');
    }
    
    })

app.post('/inicio', passport.authenticate('login', { failureRedirect: '/fail-login', failureFlash: true}), async (req, res)=>{
    req.session.user = req.body.nombre;
    req.session.password = req.body.contraseña;
    req.session.cookie.maxAge = 60000;
    await caja.obtenerTodos();
    let productos = await caja.obtenerTodos();
    let mensajes = await mensajeriaANormalizar.obtenerTodos();
    res.render('logueado', { titulo: 'PRODUCTO', titulo2: 'PRECIO', titulo3: 'THUMBNAIL', productos, mensajes, nombre: req.session.passport.user.nombre});

})

app.get('/fail-registro', (req, res)=>{
    console.log(req.flash('error'));
    // res.redirect('/');
    res.send('Fallaste el registro <br> El usuario ya está registrado con dicho nombre o debe de llenar los espacios de registro apropiadamente');
})

app.get('/fail-login', (req, res)=>{
    console.log(req.flash('error'));
    res.send('Fallaste el login')
})


app.get('/logout', (req, res) => {
    req.session.destroy(err => {
      if (err) {
        res.json({ status: 'Logout ERROR', body: err })
      } else {
        res.render('logout')
      }
    })
  })

  


app.use('/', (req,res)=>{
    res.send('ok');
})

io.on('connection', async (socket)=>{
    
    console.log('Usuario conectado: ' + socket.id);


    socket.on('prod', async (data)=>{
        console.log('socket funcionando')
        await caja.insertarProductosIndividuales(data);
        io.sockets.emit('prod', data)
    })

    socket.on('mensaje', async(data)=>{
        console.log('socket funcionando')
        await mensajeriaANormalizar.insertarMensajesIndividuales(data.cosa2);
        io.sockets.emit('mensaje', data);

    })

})


httpServer.listen(8080, () => {
    console.log(`listening on port http://localhost:${8080}`);
});