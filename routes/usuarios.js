
const { Router } = require('express');
const {check} = require('express-validator');
const {validarCampos} = require('../middlewares/validar-campos');
const { usuariosGet,
        usuariosPutPassword,
        usuariosPost,
        usuariosDelete,
        usuariosPatch } = require('../controllers/usuarios');

const { validRole, validEmail, validName, validID } = require('../helpers/db-validators');

const router = Router();


router.get('/', usuariosGet );

//Actualización de la contraseña.
router.put('/password/:id', [
    check('id','No es un ID válido').isMongoId(),
    check('id').custom(validID),    
    validarCampos
] ,usuariosPutPassword);

router.post('/',[
    //Que datos se han de validar, utilizamos un middelware.
    check('email','Email no valido').isEmail(),
    check('name','Name obligatorio').not().isEmpty(),
    check('password','Contraseña obligatoria y tamaño mayor a 6').not().isEmpty().isLength({min:6}),
    //Obtenemos las validaciones de errores de validator-express.
    check('rol').custom(validRole),
    check('email').custom(validEmail),
    check('name').custom(validName),
    validarCampos
],usuariosPost );

router.delete('/:id', [
    check('id','No es un ID válido').isMongoId(),
    check('id').custom(validID),  
    validarCampos
] , usuariosDelete );

router.patch('/', usuariosPatch );





module.exports = router;