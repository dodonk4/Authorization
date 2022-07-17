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

}

export default contenedorMongoDb;