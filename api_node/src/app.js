import express from 'express'
import config from './config'
import catalogo_servidor from './routes/catalogo_servidor.routes'

const app = express();

let port;

//Configuración de app.js
app.set('port', config.port)

app.use(catalogo_servidor)

export default app