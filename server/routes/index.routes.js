import {Router} from 'express';
import {pool} from '../../database/db.js';

const router = Router();

router.get('/ping', async (req, res) => {
    const [rows] = await pool.query('SELECT * from empleados LIMIT 10')
    console.log(rows[0]);
    res.json(rows[0])
})

export default router;