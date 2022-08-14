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
    canjear:(req,res)=>{
      conectar()
      let lista = []
      const {body} = req
      const sql = `SELECT * FROM cupones WHERE codigo_cupon = ${body.codigo} AND dui = ${body.dui}`;
      lista = con.query(sql, function (err, result) {
      if (err) throw err;
      console.log("Cupon encontrado");
      return true;
      });
      if(lista.length > 0){
         return lista;
      }
    }
}

module.exports = Cupon