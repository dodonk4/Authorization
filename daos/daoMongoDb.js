import contenedorMongoDb from "../public/contenedorMongoDb.js"//revisar esto

class DaoMongoDb extends contenedorMongoDb {

    constructor() {
        super('usuariosRegistrados', {
            // id: { type: Number, required: true },
            nombre: { type: String, required: true },
            contraseña: { type: String, required: true }
            // title: { type: String, required: true },
            // codigo: { type: Number, required: true },
            // foto: { type: String, required: true },
            // precio: { type: Number, required: true },
            // stock: { type: Number, required: true },
            // timestap: { type: Number, required: true }
        })
    }
}

export default DaoMongoDb;