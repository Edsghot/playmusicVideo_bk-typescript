import express from 'express'


class Server{
    private app: express.Application;
    private port: string;

    constructor(){
        this.app = express();
        this.port = process.env.PORT || '3000';
        this.listen();
    }

    listen(){
        this.app.listen(this.port,()=>{
            console.log('aplicacion corriendo en https://localhost:3000');
        })
    }

}


export default Server