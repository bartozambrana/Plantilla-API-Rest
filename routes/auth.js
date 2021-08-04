const { Router } = require('express');
const {check} = require('express-validator');
const router = Router();

const {login,googleLogin} = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validar-campos');

router.post('/login',[
    check('email','No es un email valido y obligatorio').isEmail().notEmpty(),
    check('password','Contraseña Obligatoria').notEmpty(),
    validarCampos
],login);


//RUTA DE IDENTIFICACIÓN GOOGLE.
router.post('/google',[
    check('id_token','token necesario').notEmpty(),
    validarCampos
],googleLogin);


module.exports = router;