const mysql = require("mysql2");

 const connDB = mysql.createConnection(
     {
         host: "localhost",
         user: "root",
        password: "Samuel12125.",
         database: "consultas"
  }
);


 connDB.connect((err)=>{
    
    if(err){
        console.log(err);
        return;
    }
    else{
        console.log("conexion exitosa");
    }

});

exports.connDB = connDB;