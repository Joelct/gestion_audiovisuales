import { Router } from 'express';
import {
    getModelos,
    getModelo,
    createModelo,
    updateModelo,
    deleteModelo,
} from '../controllers/modelos.controller.js';

const router = Router();

router.get('/modelos', getModelos);
router.get('/modelos/:id', getModelo);
router.post('/modelos', createModelo);
router.put('/modelos/:id', updateModelo);
router.delete('/modelos/:id', deleteModelo);

export default router;
