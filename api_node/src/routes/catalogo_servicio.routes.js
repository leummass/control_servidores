import {Router} from 'express'

import { getServicios } from '../controllers/catalogo_servicio.controller'

const router = Router()

router.get('/catalogo_servicio', getServicios)

export default router