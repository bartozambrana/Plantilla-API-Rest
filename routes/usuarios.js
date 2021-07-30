
const { Router } = require('express');
const {check} = require('express-validator');

// const {validarCampos} = require('../middlewares/validar-campos');
// const {validJWT} = require('../middlewares/validar-jwt');
// const { validRoleAdmin } = require('../middlewares/validar-rol');

const {
    validarCampos,
    validJWT,
    validRoleAdmin
} = require('../middlewares');

const { usuariosGet,
        usuariosPutPassword,
        usuariosPost,
        usuariosDelete,
        usuariosPatch } = require('../controllers/usuarios');

const { validRole,validEmail, validName, validID } = require('../helpers/db-validators');



const router = Router();


router.get('/', usuariosGet );

//Actualización de la contraseña.
router.put('/password/:id', [
    validJWT,
    validRoleAdmin,
    check('id','No es un ID válido').isMongoId(),
    check('id').custom(validID),    
    validarCampos
] ,usuariosPutPassword);

//Create a new user.
router.post('/',[
    //Que datos se han de validar, utilizamos un middelware.
    check('email','Email no valido').isEmail(),
    check('name','Name obligatorio').not().isEmpty(),
    check('password','Contraseña obligatoria y tamaño mayor a 6').not().isEmpty().isLength({min:6}),
    //Execute validator errors from validator-express, that checks have being created by us.
    check('rol').custom(validRole),
    check('email').custom(validEmail),
    check('name').custom(validName),
    validarCampos
],usuariosPost );

router.delete('/:id', [
    validJWT,
    validRoleAdmin,
    check('id','No es un ID válido').isMongoId(),
    check('id').custom(validID),  
    validarCampos
] , usuariosDelete );

router.patch('/', usuariosPatch );





module.exports = router;