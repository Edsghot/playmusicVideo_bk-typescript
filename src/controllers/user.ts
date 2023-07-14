import {Request,Response}from 'express'
import User from '../models/user';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'

export const getUser = async(req:Request,res:Response)=>{
    const lista = await User.findAll();
    res.json({
        msg: "Get User",
        data: lista 
    })
}

export const newUser = async(req:Request,res:Response)=>{
    const {name,email,password} = req.body;

    const hashedPassword = await bcrypt.hash(password,10)
    
    //validando si existe el usuario
    const user = await User.findOne({where: {name: name}})
    if(user){
      return res.status(400).json({
            msg: 'Ya existe un usuario con el mismo nombre '+name
        })
    }

    try{
        await User.create({
            name: name,
            email: email,
            password: hashedPassword})
        return res.json({
            msg: "Usuario "+name+" creado exitosamente"
        })
    }catch(err){
        return res.status(500).json({
            msg: "error",err
        })
    }
}

export const loginUser = async(req:Request,res:Response)=>{
    
    const {email,password} = req.body;
    //validando si el usuario existe en la base de datos
    const user:any = await User.findOne({where: {email: email}})

    if(!user){
        return res.status(404).json({
            msg: 'no existe un usuario con email '+email+' en la base de datos'
        })
    }
    //validamos el passowrd
    const passwordValid = await bcrypt.compare(password,user.password)
    if(!passwordValid){
        return res.status(400).json({
            msg: 'password incorrect'
        })
    }

    //generemos el token
    const token = jwt.sign({
        email: email,
    },process.env.SECRET_KEY || 'erick123')

    res.json({token})
}