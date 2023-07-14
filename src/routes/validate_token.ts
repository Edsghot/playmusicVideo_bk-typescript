import {Request,Response,NextFunction} from 'express'
import jwt from 'jsonwebtoken'



const validateToken = (req:Request,res: Response,next: NextFunction)=>{
    const headerToken = req.headers['authorization']

    if(headerToken != undefined && headerToken.startsWith('Bearer')){
    //tiene token
      
    //jwt verify()       
        next();
    }else{
        return res.status(401).json({
            msg: 'acceso denegado'
        })
    }
}



export default validateToken