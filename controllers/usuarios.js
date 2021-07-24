const { response, request } = require('express');
const User = require('../models/usuario');
const bcrypt = require('bcryptjs');

//Obtener todos los usuarios de la base de datos
const usuariosGet = async(req = request, res = response) => {

    //const { q, nombre = 'No name', apikey, page = 1, limit } = req.query;
    const {limit = 5} = req.query;
    const usuarios = await User.find({status:true}).limit(Number(limit));
    res.json({
        usuarios
    });
}
/**
 * Utilizamos esta función para crear un nuevo usuario en la base
 * de datos.
 */
const usuariosPost = async(req, res = response) => {
    
    //Obtenemos los campos que queremos.
    const {name,email,password,rol,google} = req.body;
    const user = new User({name,email,password,rol,google});

 
    //Encriptar la contraseña.
    const salt = bcrypt.genSaltSync(10);
    user.password = bcrypt.hashSync(password,salt);
    
    // Guardar en BD.
    await user.save();

    res.json({
        user
    });
}

//Actualiza Unicamente la COntraseña
const usuariosPutPassword = async(req, res = response) => {

    const { id } = req.params;
    const {_id,password,google,email,name,...resto} = req.body;
    
    //Validar contra base de datos.
    if(password){
        //Se quiere actualizar la contraseña.
        const salt = bcrypt.genSaltSync(10);
        resto.password = bcrypt.hashSync(password,salt);
    }

    const user = await User.findByIdAndUpdate(id,resto);

    res.json(user);
}

const usuariosPatch = (req, res = response) => {
    res.json({
        msg: 'patch API - usuariosPatch'
    });
}

const usuariosDelete = async(req, res = response) => {
    const {id} = req.params;
    //Fisicamente lo borramos.
    const user = await User.findByIdAndUpdate(id,{status:false});
    res.json(user);
}




module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPutPassword,
    usuariosPatch,
    usuariosDelete,
}