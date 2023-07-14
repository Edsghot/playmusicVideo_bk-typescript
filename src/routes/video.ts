import {Router} from 'express'
import validateToken from './validate_token';
import { getbyid,deleteVideo, descargar, descargarId, getallVideo, insertVideo, updateVideo } from '../controllers/video';

const router = Router();

router.get('/getAll',getallVideo)
router.get('/getById/:id', getbyid);
router.get('/downloadById/:id',descargarId)
//==================POST=======================================
router.post('/download',descargar);
router.post('/insert',insertVideo)
router.put('/update/:id',updateVideo);
//================DELETE =================================================
router.delete('/delete/:id', deleteVideo);

export default router;