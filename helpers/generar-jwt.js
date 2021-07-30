const jwt = require('jsonwebtoken');

const generarJTW = (uid = '') =>{

    return new Promise((resolve,reject) => {

        //Podremos guardar aquí todos los daots del usauiros
        const payload = {uid};
        jwt.sign(payload,process.env.SECRETORPUBLICKEY,{
            expiresIn:'4h'
        },(err,token)=>{
            if(err){
                console.log(err);
                reject('No se pudo generar el JTW');
            }else{
                resolve(token);
            }
        });

    });
}

module.exports = generarJTW;