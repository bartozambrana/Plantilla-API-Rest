

 const {Schema, model} = require('mongoose');

 const RoleSchema = Schema({
     rol: {
         type:String,
         require: [true, 'Rol Campo Obligatorio'],
         unique: true
     }
 });
 
 module.exports = model('Role',RoleSchema);