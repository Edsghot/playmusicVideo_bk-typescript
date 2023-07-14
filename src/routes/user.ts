import {Router} from 'express'
import { getUser, loginUser, newUser } from '../controllers/user';

const router = Router();

router.get('/getall',getUser)
router.post('/insert',newUser)
router.post('/login',loginUser)

export default router;