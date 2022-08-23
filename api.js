const express = require('express')
const mysql = require('mysql')
const controller = require('./controller')
const port = 3000 | process.env.PORT;
const app = express();

app.use(express.json());
app.use(express.static('resources'));
app.use(express.static('app'));

app.post('/canjeo',controller.canjear,(req,res)=>{
    res.status(200).send("Exito")
    console.log("exitooo")
})

app.get('/user',(req,res)=>{
    res.send('hola mundo')
    })
app.get('/view',(req,res)=>{
    res.sendFile(`${__dirname}/cupon.html`)
})

app.get('*',(req,res)=>{
    res.status(404).send('Esta pagina no existe!!')
})

app.listen(port,()=>{
    console.log("Arrancando la api")
})