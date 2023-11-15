import {Router} from 'express'

import { getDetalleServidor } from '../controllers/catalogo_detalleservidor.controller'

const router = Router()

router.get('/catalogo_detalleservidor', getDetalleServidor)

export default router