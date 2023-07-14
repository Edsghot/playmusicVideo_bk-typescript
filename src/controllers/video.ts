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

