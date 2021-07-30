
const { response, request } = require('express');
const jwt = require('jsonwebtoken');

const User = require('../models/usuario');
//El token siempre van en el header, como x-token
const validJWT = async(req = request,res = response, next) => {
    const token = req.header('x-token');
    if(!token){
        return res.status(400).json({
            msg:'No hay token en la petición'
        })
    }

    //Validamos el token.
    try{
        
        const {uid} = jwt.verify(token,process.env.SECRETORPUBLICKEY);
        //Leemos de la base de datos si el usuario con el uid existe en la base de datos.
        const user = await User.findById(uid);
        //Verificamos si el usuario no existe.
        if(!user){
            return res.status(400).json({
                msg:'El usuario no existe en la DB'
            })
        }
        //Verificamos el estado del usuario y el rol del mismo.
        if(!user.status){
            return res.status(400).json({
                msg:'Token-no válido- Usuario con status FALSE'
            })
        }
        
        //enviamos por la petición el uid del usuario autentificado.
        req.user = user;

        next();

    }catch(err){
        console.log(err);
        res.status(401).json({
            msg:'token no valido'
        })
    }

}

module.exports = {validJWT};