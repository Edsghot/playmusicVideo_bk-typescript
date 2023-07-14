import express from 'express'
import routesMusic from '../routes/music'
import RoutesUser from '../routes/user'
import User from './user'

class Server{
    private app: express.Application;
    private port: string;

    constructor(){
        this.app = express();
        this.port = process.env.PORT || '3000';
        this.listen();
        this.midlewares();
        this.routes();
        this.dbConnect();
    }

    listen(){
        this.app.listen(this.port,()=>{
            console.log(`aplicacion corriendo en http://localhost:${this.port}/`);
        })
    }
    routes(){
        this.app.use('/api/users',RoutesUser);
        this.app.use('/api/musics',routesMusic)
    }
    midlewares(){
        this.app.use(express.json());
    }
    async dbConnect(){
        try{
            await User.sync();
        }catch(error){
            console.log('Unable to connect db')
        }
    }

}


export default Server