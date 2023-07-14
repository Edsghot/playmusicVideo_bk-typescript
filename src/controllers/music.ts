import {Request, Response}from 'express'


export const getMusic = (req:Request,res:Response)=>{

    res.json({
        msg: "Get Music"
    })
}