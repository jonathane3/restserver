const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../database/config');

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.usuariosPath = '/api/usuarios';
        this.conectarBD();
        //middlewares
        this.middlewares();
        //rutas de mi app
        this.routes();
        this.listen();
    }

    async conectarBD() {
        await dbConnection();
    }

    middlewares() {
        this.app.use(express.static('forms')); 
        this.app.use(cors());
        this.app.use(express.json());
    }

    routes() {
        this.app.use(this.usuariosPath, require('../routes/usuarios'));
    }

    listen() {
        this.app.listen(process.env.PORT, () => {
            console.log('Servidor corriendo en puerto', process.env.PORT);
        });
    }
}

module.exports = Server;
