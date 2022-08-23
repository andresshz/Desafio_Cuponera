const mysql = require('mysql')

const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "cuponera_dwf"
});

const conectar = () =>{
    con.connect(function(err) {
      if (err) throw err;
      console.log("Connected!");
    });
}

const Cupon = {
    canjear:(req,res,next)=>{
      
      try{
        conectar()
        const {body} = req
        con.query(`SELECT * FROM cupones WHERE id_estado_cupon = 1 AND dui = "${body.dui}"`, function (err, result, fields) {
          if (err) throw err;
          const sql = `UPDATE cupones SET id_estado_cupon = 2 WHERE codigo_cupon = "${body.codigo}" AND dui = "${body.dui}" AND id_estado_cupon = 1`;
          con.query(sql, function (err, result) {
           if (err) throw err;
           const filas = result.affectedRows;
           if(filas > 0){
           console.log(filas + " cupon canjeadooo");
           next()
        }
        })
        }); 
      }catch(e){
        console.log(e.message)
       
      }
      ;
    }
}

module.exports = Cupon