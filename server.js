import express from 'express';

import session from 'express-session';

import MongoStore from 'connect-mongo';

import bodyParser from 'body-parser';

import { engine } from 'express-handlebars';

import passport from 'passport';

import { Strategy } from 'passport-local'

import flash from 'connect-flash';

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


passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(obj, done) {
    done(null, obj);
});


passport.use('local', new Strategy({ 
    // passReqToCallback: true,
    usernameField: 'nombre',
    passwordField: 'contraseña',
},
    function(username, password, done) {
        console.log("LocalStrategy working...");
        // const nombre = req.nombre;
        // const contraseña = req.contraseña;
        console.log(username);
        console.log(password);
        return done(null, { id: 1, nombre: username, contraseña: password});
    }
))


// function autenticar(req, username, password) {
//     if (username == req.session.passport.user) {
//         return true
//     }
// }

passport.use('login', new Strategy({ 
    passReqToCallback: true,
    usernameField: 'nombre',
    passwordField: 'contraseña',
},
    (req, username, password, done) => {
        if (req.session.passport.user == undefined) {
            done(null, false)
        } else {
            let contador = 0;
            if (username == req.session.passport.user.nombre) {

                contador++;
            }
            if (password == req.session.passport.user.contraseña) {
            contador++;
            }
            if(contador == 2){
                done(null, { id: 1, nombre: username, contraseña: password})
            }
            
        }
        
    }))

    
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

app.get('/', (req, res)=>{
    res.render('inicio');
})

app.post('/registro', passport.authenticate('local', { failureRedirect: '/fail-registro', failureFlash: true}),(req,res)=>{
     if(req.body.nombre){
        res.render('registrado', {nombre: req.body.nombre} )
        req.session.user = req.body.nombre;
        req.session.password = req.body.contraseña;
        req.session.cookie.maxAge = 60000;
        console.log(req.session.passport.user)
        //RENDERIZAR UN LOGIN QUE DIRIJA A UNA RUTA CON PASSPORT DE LOGIN
      }
      else{
        res.send('login failed')
      }
})


app.get('/registro', passport.authenticate('local2', { failureRedirect: '/fail-registro', failureFlash: true}),(req,res)=>{
    res.render('registrado')
})

app.get('/login', (req, res)=>{
    res.render('logueado', {nombre: req.session.passport.user.nombre})
    })

app.post('/login', passport.authenticate('login', { successRedirect : '/login', failureRedirect: '/fail-login', failureFlash: true}),(req, res)=>{
})

app.get('/fail-registro', (req, res)=>{
    console.log(req.flash('error'));
    res.redirect('/');
})

app.get('/fail-login', (req, res)=>{
    console.log(req.flash('error'));
    res.send('Fallaste el login')
})


app.get('/logout', (req, res) => {
    console.log(req.session.passport.user)
    req.session.destroy(err => {
      if (err) {
        res.json({ status: 'Logout ERROR', body: err })
      } else {
        res.render('logout')
      }
    })
  })

const server = app.listen(8080, () => {
    console.log(`escuchando en puerto ${server.address().port}`)
})