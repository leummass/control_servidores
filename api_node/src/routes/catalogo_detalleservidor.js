import {Router} from 'express'

import { getDetalleServidorById } from '../controllers/catalogo_detalleservidor.controller'

const router = Router()

router.get('/catalogo_detalleservidor/:id', getDetalleServidorById)

export default router