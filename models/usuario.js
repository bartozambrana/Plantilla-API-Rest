/**
 *
 * Primero hemos de pensar como queremos que se vea el usuario
 * en la base de datos
 * 
 * {
 *      name: ... string
 *      email: ... string
 *      img: .... string
 *      rol: .... string
 *      status: true
 *      google: true
 * }
 * 
 * Siempre se extrae el Schema para definirlo
 * Siempre se extrae el modelo para definir al usuario.
 */


const {Schema, model} = require('mongoose');

const UserSchema = Schema({
    name: {
        type:String,
        require: [true, 'El nombre es obligatorio'],
        unique: true
    },
    email: {
        type:String,
        require: [true, 'El email es obligatorio'],
        unique: true
    },
    password: {
        type:String,
        require: [true, 'La constraseña es obligatoria']
    },
    img: {
        type:String
    },
    rol: {
        type:String,
        default: 'USER_ROLE', 
        require: [true, 'El rol es obligatorio'],
        enum: ['ADMIN_ROLE','USER_ROLE']
    },
    status:{
        type: Boolean,
        default: true
    },
    google:{
        type:Boolean,
        default: false
    }
});

//Lo utilizamos para eliminar los campos que no queremos que se observen
//en el objeto json que vamos a devolver.
UserSchema.methods.toJSON = function() {
    const {__v,password,_id,...user} = this.toObject();
    user.uid = _id;
    return user;
}

module.exports = model('User',UserSchema);