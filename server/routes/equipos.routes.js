import { Router } from 'express';
import {
    getEquipos,
    getEquipo,
    createEquipo,
    updateEquipo,
    deleteEquipo,
} from '../controllers/equipos.controller.js';

const router = Router();

router.get('/equipos', getEquipos);
router.get('/equipos/:id', getEquipo);
router.post('/equipos', createEquipo);
router.put('/equipos/:id', updateEquipo);
router.delete('/equipos/:id', deleteEquipo);

export default router;
