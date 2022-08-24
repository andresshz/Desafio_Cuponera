const mysql = require('mysql')

const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "cuponera_dwf"
});


const Cupon = {
    canjear:(req,res,next)=>{
      try{
        con.connect(function(err) {
          if (err) throw err;
          console.log("Connected!");
        });
        const {body} = req
        con.query(`SELECT * FROM cupones WHERE id_estado_cupon = 1 AND dui = "${body.dui}"`, function (err, result, fields) {
          const select = result.affectedRows;
          if (select == null) {
            res.send("Error")
            return;
          }
          const sql = `UPDATE cupones SET id_estado_cupon = 2 WHERE codigo_cupon = "${body.codigo}" AND dui = "${body.dui}"`;
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