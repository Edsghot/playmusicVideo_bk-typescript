import Video from '../models/video'
import {exec} from 'youtube-dl-exec'
import fs from 'fs'
import util from 'util'
import {Request,Response} from 'express'

const unlinkAsync = util.promisify(fs.unlink);

export const getallVideo = async(req:Request,res:Response)=>{
    try {
        const video:any = await Video.findAll();
        res.status(200).json({msg: 'operacion exitosa',result:video});
      } catch (error) {
        res.status(500).json({ message: "Error retrieving video", error: error });
      }
} 

export const insertVideo = async (req:Request, res:Response) => {
    try {
      const { name, description, url } = req.body;
      const download = false;
      const state = false;
      if (!name || !description || !url) {
        return res.status(400).json({ msg: "uno o mas campos vacios" });
      }
      const video = await Video.create({ name, description, url,download,state });
  
      return res.status(201).json({ msg: "operacion exitosa", result: video });
    } catch (error) {
      return res.status(500).json({ message: "Error al insertar", error });
    }
  };

export const getbyid = async (req:Request, res:Response) => {
    try {
      const { id } = req.params;
      const video = await Video.findByPk(id);
  
      if (!video) {
        return res.status(404).json({ msg: "video no encontrado" });
      }
  
      res.status(200).json({ msg: "exitoso", result: video });
    } catch (error) {
      res.status(500).json({
        msg: "error",
        error,
      });
    }
  };

export const deleteVideo = async (req:Request, res:Response) => {
    try {
      const { id } = req.params;
  
      const video = await Video.findByPk(id);
      if (!video) {
        return res.status(404).json({
          msg: "No se encontro el video",
        });
      }
  
      await video.destroy();
  
      res.status(200).json({ msg: "operacion exitosa" });
    } catch (error) {
      res.status(500).json({
        msg: "error",
        error,
      });
    }
};


export const updateVideo = async (req:Request, res:Response) => {
    try {
      const { id } = req.params;
      const { name, description, url ,state} = req.body;
  
      const video = await Video.findByPk(id);
      if (!video) {
        return res.status(404).json({
          msg: "no hay Video",
        });
      }
  
      if (!name || !description || !url ) {
        return res.status(400).json({
          msg: "uno o mas campos vacios",
        });
      }
  
      const update = await video.update({ name, description, url,state });
  
     return res.status(201).json({ msg: "operacion exitosa!", result: update });
    } catch (error) {
      return res.status(500).json({
        msg: "error",
        error,
      });
    }
  };
  
export const descargar = async (req:Request, res:Response) => {
    try {
      const {url} = req.body;
      const options = {
        output: "video.mp4",
        restrictFilenames: true,
      };
  
      if (!url) {
        return res.status(500).json({
          msg: "uno o mas campos vacios",
        });
      }
  
        await exec(url, options);
        const filePath = "video.mp4.webm";
  
        if (!fs.existsSync(filePath)) {
         throw new Error(
            "El archivo de video no se encontró en la ubicación esperada"
          );
        }
  
        res.download(filePath, "video.mp4", async (err) => {
          if (err) {
             return res
              .status(500)
              .send("Ocurrió un error al enviar el archivo al frontend");
          } else {
            await unlinkAsync(filePath);
          }
        });  
    } catch (error) {
      res.status(500).send("Ocurrió un error al descargar el video");
    }
  };
  