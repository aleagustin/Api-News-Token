const jwt = require("jsonwebtoken");
module.exports = {
  checkToken: (req, res, next) => {
    let token = req.get("authorization");

  /**
   * Un problema que tuve es que cuando vi videos recortaban los primeros 7 caracteres 
   * o usaban el split (" ") el caso es que no hay que hacerlo se ve que anteriormente
   * devolvia una palabra adelante del token.
   * Importante la clave secreta de la funcion Login() en usuario sea la misma que aquí
   * por ultimo la linea 4 let token = req.get("authorization"); es el nombre de como tenemos que ponerle a 
   * la cabezera clave valor NO ES X-ACCESS-TOKEN en este caso authorization
   */

    if (token) {
      
      jwt.verify(token, 'miClaveSecreta', (err, decoded) => {
        if (err) {
           console.log(err)
            console.log(token)
          return res.json({
            success: 0,
            message: "token invalido"
          });
        } else {
          req.decoded = decoded;
          next();
        }
      });
    } else {
      return res.json({
        success: 0,
        message: "Usuario no autorizado"
      });
    }
  }
};