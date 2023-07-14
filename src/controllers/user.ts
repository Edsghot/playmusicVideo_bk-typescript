import {Request,Response}from 'express'
import User from '../models/user';
import bcrypt from 'bcrypt';


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
    
    await User.create({
        name: name,
        email: email,
        password: hashedPassword})
    
    
    res.json({
        msg: "Usuario"+name+" creado exitosamente"
    })
}

export const loginUser = (req:Request,res:Response)=>{
    console.log(req.body)
    res.json({
        msg: "login",
        data: req.body
    })
}