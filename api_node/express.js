const express = require('express');
const mssql = require('mssql');
const cors = require('cors');
const confconex = require('./confconex');


const app = express();
const PORT = 3000;

app.use(cors());

app.get('/consultarServidores', async (req, res) => {
    try{
        const pool = await mssql.connect(confconex);
        const consulta = await pool.request().query('select * from Catalogo_Servidor');
        res.json(consulta.recordset);
    } catch(error){
        console.error('Error al consultar los datos ',error);
        console.log(error)
        res.status(500).send('Error al consultar los datos');
    }
});
app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(PORT, () => {
    console.log(`Servidor en ejecución en el puerto ${PORT}`);
});