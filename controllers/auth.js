const { response, request } = require('express');
const bcryptjs = require('bcryptjs');
const User = require('../models/usuario');
const generarJTW = require('../helpers/generar-jwt');
const {googleVerify} = require('../helpers/google-verify');

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


//Procedimiento de autentificación de google
const googleLogin = async(req = request, res = response) => {
    const {id_token} = req.body;

    
    try {
        const googleUser = await googleVerify(id_token);
        //Obtenemos los datos que necesitamos
        const {name, email, img} = googleUser;
        //Verificamos si el usuario ya existe o no
        let user = await User.findOne({email});
        
        if(!user){
            //Tengo que crear el usuario.
            const data = {
                name,
                email,
                password: '',
                img,
                google:true
            }

            user = new User(data);
            await user.save();
        }
        //Tambien se puede realizar la actualización si el usuario ya existe.
        if(!user.status){
            return res.status(401).json({
                msg: 'Hable con el administrador para desbloquear el usuario'
            })
        }

        //Generamos el JWT
        const token = await generarJTW(user.id);
        console.log(token);
        res.json({
            user,
            token
        })
    } catch (error) {
        res.status(400).json({msg:"Token de google no es válido ", error});
    }
    
}

module.exports = {
    login,
    googleLogin
}