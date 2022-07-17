export default {
    mongodb: {
        cnxStr: 'mongodb+srv://root:1234@cluster0.5xw3itz.mongodb.net/?retryWrites=true&w=majority',
        options: {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            // useCreateIndex: true,
            serverSelectionTimeoutMS: 5000,
        }
    },
    MODO_PERSISTENCIA: 'mongodb'
}