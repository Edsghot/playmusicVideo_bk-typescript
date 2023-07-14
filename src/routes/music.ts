import {Router} from 'express'
import { getMusic } from '../controllers/music';
import validateToken from './validate_token';

const router = Router();

router.get('/',validateToken,getMusic)


export default router;