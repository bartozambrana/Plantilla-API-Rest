const Role = require('../models/role');
const User = require('../models/usuario');

const validRole = async (rol='') => {
    const existsRole = await Role.findOne({rol});
    if(!existsRole){
        throw new Error(`Rol ${rol} no es válido`);
    }
}

//Verificar si el correo existe.
const validEmail = async(email = '') => {
    const existsEmail  = await User.findOne({email});
    if(existsEmail){
        throw new Error(`El email ${email} ya existe`);
    }
}

//Verificar si el usuario existe.
const validName = async(name = '') => {
    
    const existsName  = await User.findOne({name});
    if(existsName){
        throw new Error(`El nombre de usuario ${name} ya existe`);
    }
}

//Verificar si el id existe.
const validID = async(id = '') => {
    
    const existsID  = await User.findById(id);
    if(!existsID){
        throw new Error(`El ID no existe ${id}`);
    }
}
module.exports = {
    validRole,
    validEmail,
    validName,
    validID
}