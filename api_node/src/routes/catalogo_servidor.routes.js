import {Router} from 'express'

import { getServidores } from '../controllers/catalogo_servidor.controller'

const router = Router()

router.get('/catalogo_servidor', getServidores)

router.post('/catalogo_servidor', )

router.delete('/catalogo_servidor', )

router.put('/catalogo_servidor', )

router.get('/catalogo_servidor', )

export default router