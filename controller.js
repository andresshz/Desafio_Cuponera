
const soapS = require('soap')

const soap = require('strong-soap').soap;



const Cupon = {
  
    canjear:(req,res,next)=>{
      let url = "http://localhost:8080/WebServicesCuponera/services/CuponImpl?wsdl";
      const {body} = req;
      const codigo = "COD320";
     
      soapS.createClient(url, function(err, client){
          if(err){
            console.log(err)
          }else{
               client.busqueda(codigo, function(err, response){
                  if(err){
                    console.log(err)
                  }else{
                    console.log(`exitooooooo`);
                    next();
                  }
               })
          }
      })
    }, 
    
    canjeo: (req,res,next)=>{
      const {body} = req;
      let url = "http://localhost:8080/WebServicesCuponera/services/CuponImpl?wsdl";
      let requestArgs = {
        codigo: `${body.cod}`,
        dui: `${body.dui}`
      };
      var options = {};
      soap.createClient(url, options, function(err, client) {
        if(err){
          return "Error";
        }
        let method = client['busqueda'];
        method(requestArgs, function(err,result, envelope, soapHeader){
          console.log('XML: \n' + envelope);
          console.log('Result: \n' + JSON.stringify(result));
          next();
        });
      });
    }
}

module.exports = Cupon