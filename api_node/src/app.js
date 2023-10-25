import express from 'express'
import config from './config'
import catalogo_servidor from './routes/catalogo_servidor.routes'
import catalogo_servicio from './routes/catalogo_servicio.routes.js'
import cors from 'cors'

const app = express();

let port;

//Configuración de app.js
app.set('port', config.port)
app.use(cors());
//middleware
app.use(express.json());
app.use(express.urlencoded({extended:false})); //Permite enviar datos por medio de html


//Rutas
app.use(catalogo_servidor)
app.use(catalogo_servicio)

export default app