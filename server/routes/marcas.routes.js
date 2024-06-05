import { Router } from 'express';
import {
  getMarcas,
  getMarca,
  createMarca,
  updateMarca,
  deleteMarca,
} from '../controllers/marcas.controller.js';

const router = Router();

router.get('/marcas', getMarcas);
router.get('/marcas/:id', getMarca);
router.post('/marcas', createMarca);
router.put('/marcas/:id', updateMarca);
router.delete('/marcas/:id', deleteMarca);

export default router;

