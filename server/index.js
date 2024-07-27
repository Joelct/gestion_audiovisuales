import express from 'express';
import cors from 'cors';
import {PORT} from './config.js';

import indexRoutes from './routes/index.routes.js';
import empleadosRoutes from './routes/empleados.routes.js';
import tiposEquiposRoutes from './routes/tipos_equipos.routes.js';
import equiposRouter from './routes/equipos.routes.js';
import usuariosRouter from './routes/usuarios.routes.js';
import marcasRouter from './routes/marcas.routes.js';
import modelosRouter from './routes/modelos.routes.js';
import tec_conexionRouter from './routes/tec_conexion.routes.js';
import procesosRouter from './routes/procesos.routes.js';
import { register, login } from './controllers/login.controller.js';

const app = express();

app.use(cors());
app.use(express.json());

app.post('/api/register', register);
app.post('/api/login', login);
app.use('/api', indexRoutes);
app.use('/api', empleadosRoutes);
app.use('/api', tiposEquiposRoutes);
app.use('/api', equiposRouter);
app.use('/api', usuariosRouter);
app.use('/api', modelosRouter);
app.use('/api', marcasRouter);
app.use('/api', procesosRouter);
app.use('/api', tec_conexionRouter);


app.listen(PORT)
console.log(`El servidor se esta ejecutando en el puerto ${PORT}`);
