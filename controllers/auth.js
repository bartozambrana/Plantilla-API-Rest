const { response, request } = require('express');
const bcryptjs = require('bcryptjs');
const User = require('../models/usuario');
const generarJTW = require('../helpers/generar-jwt');

const login = async(req = request, res = response) => {
    const {email,password} = req.body;
    
    
    try {
        
        //Verificar si el email existe.
        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({
                msg : 'El email no existe'
            });
        }
        
        //Verificar si el usario está activo.
        if(!user.status){
            return res.status(400).json({
                msg : 'El usuario no existe en el sistema, status:false'
            });
        }
        
        //Verificar la contraseña.
        const validPassword = bcryptjs.compareSync(password, user.password)
        if(!validPassword){
            return res.status(400).json({
                msg : `La constaseña ${password} no es correcta`
            });
        }

        //Generar JWT
        const token = await generarJTW(user.id);  

        res.json({
            msg : 'Login ok',
            user,
            token
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({msg:'Algo salió mal'});
    }

}

module.exports = {
    login
}