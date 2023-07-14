import {Router} from 'express'
import { getUser, loginUser, newUser } from '../controllers/user';
import validateToken from './validate_token';

const router = Router();

router.get('/getall',validateToken,getUser)
router.post('/insert',newUser)
router.post('/login',loginUser)

export default router;