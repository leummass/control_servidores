import {Router} from 'express'

import { getServidores, addServidor, getServidorById, deleteServidorById, updateServidorById} from '../controllers/catalogo_servidor.controller'

const router = Router()

router.post('/catalogo_servidor', getServidores)

router.post('/catalogo_servidor', addServidor)

router.get('/catalogo_servidor/:id', getServidorById)

router.delete('/catalogo_servidor/:id', deleteServidorById)

router.put('/catalogo_servidor/:id', updateServidorById)



export default router