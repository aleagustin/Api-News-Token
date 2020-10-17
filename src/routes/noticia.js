const { query } = require('express');
const express = require('express');
const router = express.Router();
const app = express()

const { checkToken } = require("../auth/jwt")
const mysqlConnection  = require('../database.js');





// Recupero todos los Usuarios
router.get('/noticias' , checkToken,(req, res) => {
  mysqlConnection.query('SELECT * FROM noticia', (err, rows, fields) => {
    if(!err) {
      res.json(rows);
    } else {
      console.log(err);
    }
  });  
});


//Recupero por id de noticia una noticia
router.get('/noticia/:id', checkToken,(req, res) => {
    const { id } = req.params; 
    mysqlConnection.query('SELECT * FROM noticia WHERE id = ?', [id], (err, rows, fields) => {
      if (!err) {
        res.json(rows[0]);// Debe haber solo un usuario con ese id pero devolvemos 1er posición
      } else {
        console.log(err);
      }
    });
  });

// Recupero todas las noticias que pertenecen a un usuario
  router.get('/noticia/usuario/:id', checkToken,(req, res) => {
    const { id } = req.params; 
    mysqlConnection.query('select * from noticia where id_usuario = ?' , [id], (err, rows, fields) => {
      if (!err) {
        res.json(rows);// Devolvemos las filas [..,..,..]
      } else {
        console.log(err);
      }
    });
  });

  router.get('/noticia/seccion/:id', checkToken,(req, res) => {
  const { id } = req.params; 
    mysqlConnection.query( "select * from noticia where idSeccion =?"    /*'select * from noticia inner join seccion on idSeccion = ?'*/ , [id], (err, rows, fields) => {
      if (!err) {
        res.json(rows);// Devolvemos las filas [..,..,..]
      } else {
        console.log(err);
      }
    });
  });


  module.exports = router;