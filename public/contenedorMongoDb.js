import pkg from 'mongoose';
const { model } = pkg;
import mongoose from 'mongoose'
import config from '../config.js'

await mongoose.connect(config.mongodb.cnxStr, config.mongodb.options)



class contenedorMongoDb{
    constructor(nombreColeccion, esquema) {
        this.coleccion = mongoose.model(nombreColeccion, esquema)
    }

    async save(objeto){
            try {
                // let date = Date.now();
                const user = {nombre: objeto.nombre, contraseña: objeto.contraseña};
                const userSaveModel = new this.coleccion(user);
                let userSave = await userSaveModel.save();
                console.log(userSave);
            } catch (error) {
                throw new Error(`Error en escritura: ${error}`)
            }
        
    }

    async getAll(){
        try{
                let usuarios = await this.coleccion.find({});
                // console.log(usuarios);
                // console.log('getAll funcionando en MongoDB');
                // console.log(usuarios[0].nombre);
                return usuarios;
        }
        catch(err){
            throw new Error(`Error de lectura: ${err}`)
        }
    }

    async checkForDoubleUser(user){
        try{
            let contador = 0;
            console.log('-------CHECKFORDOUBLEUSER-------');
            console.log(user.nombre + user.contraseña);
            let usuarios = await this.coleccion.find({});
                await usuarios.map((item)=>{
                    console.log('-----MAP-----')
                    console.log(item.nombre + item.contraseña);
                    if(user.nombre === item.nombre){
                        console.log('Es false');
                        // return false;
                        contador++;
                    }else{
                        console.log('Es true');
                        // return true;
                    }
                    // return item.name 
                });
                if (contador >= 1) {
                    console.log(contador);
                    return false;
                } else {
                    return true;
                }
                // let isDuplicate = valueArr.some((user, idx)=>{ 
                //     return valueArr.indexOf(item) != idx 
                // });
                // if(isDuplicate === true){
                //     return false;
                // }else{
                //     return usuarios;
                // }
                // console.log(usuarios);
                // console.log('getAll funcionando en MongoDB');
                // console.log(usuarios[0].nombre);
               
        }
        catch(err){
            throw new Error(`Error de lectura: ${err}`)
        }
    }

}

export default contenedorMongoDb;