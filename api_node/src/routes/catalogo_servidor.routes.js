import {Router} from 'express'

import { getServidores } from '../controllers/catalogo_servidor.controller'

const router = Router()

router.get('/catalogo_servidor', getServidores)

export default router