
const soapS = require('soap')

const soap = require('strong-soap').soap;
 


const Cupon = {
     
    canjeo: (req,res,next)=>{
      const {body} = req;
      
      //Consumo el WebServices
      let url = "http://localhost:8080/WebServicesCuponera/services/CuponImpl?wsdl";
      let requestArgs = {
        codigo: `${body.cod}`,
        dui: `${body.dui}`
      };
      var options = {};
      soap.createClient(url, options, function(err, client) {
        let method = client['canjear'];
        method(requestArgs, function(err,result, envelope, soapHeader){
          console.log('XML: \n' + envelope);
          console.log('Result: \n' + JSON.stringify(result));
          const prueba = result.return;
          if(prueba === 'Error'){
            res.send('Error');
          }else{
            next();
          }
        });
      });
    }
}

module.exports = Cupon