const { request, response } = require("express");


const validRoleAdmin = (req=request,res = response) => {

    if(!req.user){
        return res.status(500).json({
            msg: 'Se quiere validar el rol de usuario tras validar el token'
        })
    }
    

    const {rol,name} = req.user;
    if(rol != 'ADMIN_ROLE'){
        return res.status(400).json({
            msg:`Usuario ${name} utentificado sin previlegio admin`
        });
    }

    next();
}

module.exports = {
    validRoleAdmin
}