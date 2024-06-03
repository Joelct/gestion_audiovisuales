import { Router } from 'express';
import {
    getTecConexiones,
    getTecConexion,
    createTecConexion,
    updateTecConexion,
    deleteTecConexion,
} from '../controllers/tec_conexion.controller.js';

const router = Router();

router.get('/tec_conexiones', getTecConexiones);
router.get('/tec_conexiones/:id', getTecConexion);
router.post('/tec_conexiones', createTecConexion);
router.put('/tec_conexiones/:id', updateTecConexion);
router.delete('/tec_conexiones/:id', deleteTecConexion);

export default router;
