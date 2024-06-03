import { Router } from 'express';
import {
    getTiposEquipos,
    getTipoEquipo,
    createTipoEquipo,
    updateTipoEquipo,
    deleteTipoEquipo,
} from '../controllers/tipos_equipos.controller.js';

const router = Router();

router.get("/tipos_equipos", getTiposEquipos);

router.get("/tipos_equipos/:id", getTipoEquipo);

router.post("/tipos_equipos", createTipoEquipo);

router.put("/tipos_equipos/:id", updateTipoEquipo);

router.delete("/tipos_equipos/:id", deleteTipoEquipo);

export default router;
