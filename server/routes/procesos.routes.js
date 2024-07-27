import { Router } from 'express';
import {
    getProcesos,
    getProceso,
    createProceso,
    updateProceso,
    deleteProceso,
} from '../controllers/procesos.controller.js';

const router = Router();

router.get('/procesos', getProcesos);
router.get('/procesos/:id', getProceso);
router.post('/procesos', createProceso);
router.put('/procesos/:id', updateProceso);
router.delete('/procesos/:id', deleteProceso);

export default router;