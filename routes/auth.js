const { Router } = require('express');
const {check} = require('express-validator');
const router = Router();

const {login} = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validar-campos');

router.post('/login',[
    check('email','No es un email valido y obligatorio').isEmail().notEmpty(),
    check('password','Contraseña Obligatoria').notEmpty(),
    validarCampos
],login);

module.exports = router;