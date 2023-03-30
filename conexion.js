var express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const BD = require('./base_de_datos');
const aplicacion = express();
aplicacion.set('view engine', 'ejs');
aplicacion.use(express.json());
aplicacion.use(cors());
aplicacion.use(express.static('public'));
var database = BD.connDB;

// aplicacion.get('/corre/:correo', (req, res) => {
//   respuesta = {};
//   var correo = req.params.correo;
//   database.query('select * from usuario where correo = ?',[correo], (error, rows, fields) => {
//       if (error) {
//           respuesta.status = false;
//           respuesta.message = error;
//           res.json(respuesta);
//       } else {
//           res.json(rows);
//           console.log("Consulta Ok");
//       }
//   });
// });

// aplicacion.get('/contrasena/:contra', (req, res) => {
//     respuesta = {};
//     var contra = req.params.contra;
//     database.query('select id_usr from usuario where contrasena = ?',[contra], (error, rows, fields) => {
//         if (error) {
//             respuesta.status = false;
//             respuesta.message = error;
//             res.json(respuesta);
//         } else {
//             res.json(rows);
//             console.log("Consulta Ok");
//         }
//     });
//   });



  aplicacion.get('/', (req, res) => {
    res.json({hola : 'hola'});
  });

aplicacion.post('/login', (req, res) => {
    const respuesta = {};
    var password = req.body.contrasena;
    var correo = req.body.correo;
    q = `select * from usuario where contrasena = '${password}' and correo = '${correo}'`
    console.log(q)
    database.query(q, (error, rows, fields) => {
        if (error) {
            respuesta.status = false;
            respuesta.message = error;
            res.json(respuesta.data);
        } else {
            res.json(rows);
            console.log("Consulta Ok");
        }
    });
  });

  aplicacion.get('/doc', (req, res) => {
    console.log(req.body);
    
    q = `select * from doctor;`
    console.log(q)
    database.query(q, (error, rows, fields) => {
        if (error) {
            respuesta.status = false;
            respuesta.message = error;
            res.json(respuesta.rows);
        } else {
            res.json(rows);
            console.log("Consulta Ok");
        }
    });
  });

  aplicacion.post('/cita', (req, res) => {
    console.log(req.body);
    respuesta = {}
    
    cita = `select c.*, concat(u.nombres, ' ', u.ape_mat, ' ', u.ape_pat) as usuario, d.nombre from cita c, usuario u, doctor d
    where c.id_usu = u.id_usr and c.id_doc = d.id_doc and c.id_cita = ${req.body.id} group by 1, 2`
    console.log(cita)
    database.query(cita, (error, rows, fields) => {
        if (error) {
            respuesta.status = false;
            respuesta.message = error;
            res.json(respuesta.rows);
        } else {
            res.json(rows);
            console.log("Consulta Ok");
        }
    });
  });

  aplicacion.post('/citas', (req, res) => {
    console.log(req.body);
    respuesta = {}
    cita = `select c.*, concat(u.nombres, ' ', u.ape_mat, ' ', u.ape_pat) as usuario, d.nombre from cita c, usuario u, doctor d
    where c.id_usu = u.id_usr and c.id_doc = d.id_doc and u.id_usr = ${req.body.id} group by 1, 2`
    console.log(cita)
    database.query(cita, (error, rows, fields) => {
        if (error) {
            respuesta.status = false;
            respuesta.message = error;
            console.log(error)
            res.json(respuesta.rows);
        } else {
            res.json(rows);
            console.log("Consulta Ok");
        }
    });
  });

  aplicacion.post('/elimcita', (req, res) => {
    console.log(req.body);
    respuesta = {}
    let q2 = `delete from cita where id_cita = ${req.body.cita} `
    
    console.log(q2)
    database.query(q2, (error, rows, fields) => {
        if (error) {
            respuesta.status = false;
            respuesta.message = error;
            console.log(error)
            res.json(respuesta.rows);
        } else {
            res.json(rows);
            console.log("Consulta Ok");
        }
    });
  });
  
  aplicacion.post('/agendar', (req, res) => {
    respuesta = {}
    console.log(req.body);
    
    q1 = `INSERT INTO cita (fecha, hora, id_doc, id_usu) VALUES ('${req.body.fecha}', '${req.body.hora}', '${req.body.doctor}', '${req.body.usuario}');
    `


    console.log(q1)
    database.query(q1, (error, rows, fields) => {
        if (error) {
            respuesta.status = false;
            respuesta.message = error;
            console.log(error)
            res.json(respuesta.rows);
        } else {
            res.json(rows);
            console.log("Consulta Ok");
        }
    });
  });
  
  aplicacion.post('/editar', (req, res) => {
    respuesta = {}
    console.log(req.body);
    
    q1 = `UPDATE cita SET fecha = '${req.body.fecha}', hora = '${req.body.hora}', id_doc = '${req.body.doctor}' WHERE (id_cita = '${req.body.cita}');`


    console.log(q1)
    database.query(q1, (error, rows, fields) => {
        if (error) {
            respuesta.status = false;
            respuesta.message = error;
            console.log(error)
            res.json(respuesta.rows);
        } else {
            res.json(rows);
            console.log("Consulta Ok");
        }
    });
  });

  aplicacion.post('/add', (req, res) => {
    console.log(req.body);
    const respuesta = {};   
    var fecha = req.body.fecha;
    var hora = req.body.hora;
    var nombre_doc = req.body.nombre_doc;
    var ape_mat = req.body.ape_mat;
    var edad = req.body.edad;
    var telefono = req.body.telefono;
    var password = req.body.contrasena;
    
    q = `insert into usuario (nombres,ape_mat,ape_pat,telefono,edad,correo,contrasena) values ('${nombres}', '${ape_mat}', '${ape_pat}', '${telefono}','${edad}', '${correo}', '${password}');`
    console.log(q)
    database.query(q, (error, rows, fields) => {
        if (error) {
            respuesta.status = false;
            respuesta.message = error;
            res.json(respuesta.data);
        } else {
            res.json(rows);
            console.log("Consulta Ok");
        }
    });
  });

  aplicacion.post('/register', (req, res) => {
    console.log(req.body);
    const respuesta = {};   
    var correo = req.body.correo;
    var nombres = req.body.nombres;
    var ape_pat = req.body.ape_pat;
    var ape_mat = req.body.ape_mat;
    var edad = req.body.edad;
    var telefono = req.body.telefono;
    var password = req.body.contrasena;
    
    q = `insert into usuario (nombres,ape_mat,ape_pat,telefono,edad,correo,contrasena) values ('${nombres}', '${ape_mat}', '${ape_pat}', '${telefono}','${edad}', '${correo}', '${password}');`
    console.log(q)
    database.query(q, (error, rows, fields) => {
        if (error) {
            respuesta.status = false;
            respuesta.message = error;
            res.json(respuesta.data);
        } else {
            res.json(rows);
            console.log("Consulta Ok");
        }
    });
  });

aplicacion.listen(8080);
console.log("Esta el puerto 8080 escuchando");

// aplicacion.get('/login/:', (req, res) => {
//   respuesta = {};
//   database.query('select * from usuario ', (error, rows, fields) => {
//       if (error) {
//           respuesta.status = false;
//           respuesta.message = error;
//           res.json(respuesta);
//       } else {
//           res.json(rows);
//           console.log("Consulta Ok");
//       }
//   });
// });

// aplicacion.post('/login', (req, res) => {
//     const reqData = {};
//     var login = req.body.login;
//     var passwd = req.body.password;
//     database.query('select * from usuarios where login=? and password=sha1(?)', [login, passwd], (err, rows, fields) => {
//         if (!err) {
//             const hash = crypto.createHash('sha1').update(passwd).digest('hex');
//             if (rows.length == 1 && rows[0].login == login && rows[0].password == hash) {
//                 const user = rows[0];
//                 jwt.sign({ user: user }, 'accessKey', { expiresIn: '1h' }, (err, token, name, email) => {
//                     var name = rows[0].login;
//                     var email = rows[0].email;

//                     res.json({ token: token, name: name, email: email });
//                 });
//             } else {
//                 res.sendStatus(403);
//             }
//         } else {
//             res.sendStatus(503);
//         }

//     })
// })
