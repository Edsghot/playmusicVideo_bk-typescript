import {Router} from 'express'
import { getMusic } from '../controllers/music';


const router = Router();

router.get('/',getMusic)


export default router;