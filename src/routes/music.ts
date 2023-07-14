import {Router} from 'express'
import { deleteMusic, descargarId, descargarId2, descargarmusica, getMusic, getbyid, insertMusic, update } from '../controllers/music';
import validateToken from './validate_token';

const router = Router();
router.get('/getall',getMusic)
router.get('/downloadbyid/:id',descargarId)
router.get('/downloadfile/:id',descargarId2)
router.post('/download', descargarmusica);
router.post('/insert',insertMusic)
router.get('/getbyid/:id', getbyid);
router.put('/update/:id',update);
router.delete('/delete/:id', deleteMusic);

export default router;