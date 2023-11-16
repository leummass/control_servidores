import {Router} from 'express'

import { getDetalleServidor, addDetalleServidor } from '../controllers/catalogo_detalleservidor.controller'

const router = Router()

router.get('/catalogo_detalleservidor', getDetalleServidor)

router.post('/catalogo_detalleservidor/anadir', addDetalleServidor)

export default router