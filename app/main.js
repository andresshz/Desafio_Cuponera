const validarCodigo =(codigo)=>{
    if(/^([0-9])*$/.test(codigo)){
       return true;
    }else{
        return false;
    }
}

const validarDui = (dui) =>{ 
    if(/(^\d{8})-(\d$)/.test(dui)){
        return true;
     }else{
         return false;
     }
}

const initTemplate = () =>{
const template = `
<div id="notificar-success" >

</div>
<div id="notificar-error" >

</div>
<form id="formulario">
<h3>Canjear cupon</h3>
<div class="input-field col s6">
    <input id="codigo" name="codigo" type="text" data-length="10" max="10" required>
    <label for="codigo">Ingrese codigo del cupon:</label>
</div>
<div class="input-field col s6">
    <input id="dui" name="dui" type="text" data-length="10" max="10" required>
    <label for="dui">Ingrese dui:</label>
</div>
<button class="btn waves-effect waves-light" type="submit" name="action">Canjear Cupon</button>
</form>


`;

const body = document.getElementsByTagName('body')[0]
body.innerHTML = template;
}

const addForm = () =>{
const form = document.getElementById('formulario')
form.onsubmit = async (e) =>{
e.preventDefault()

//Validaciones
let dui = document.getElementById('dui').value;
let codigo_cupon = document.getElementById('codigo').value;
if(validarCodigo(codigo_cupon) == true && validarDui(dui) == true){
    const data = new FormData(form)
    const dataForm = Object.fromEntries(data.entries())
    console.log(dataForm)

    const request = await fetch('/canjeo', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dataForm)
    })
    
    const respuesta = await request.text()
    if(respuesta === "Exito"){
        const notificar = document.getElementById('notificar-success')
        notificar.innerHTML = `
        <section class="alert alert-success" role="alert">Cupon canjeado correctamente!!!!</section>
        `;
        form.reset()
    }else if(respuesta === "Error"){
        const notificar = document.getElementById('notificar-error')
        notificar.innerHTML = `<section class="alert alert-danger" role="alert">El cupon ya ha sido canjeado!!!</section>`
        form.reset()
    }
}else{
    alert('Formato incorrecto!!!')
    return;
}

}
}
window.onload = () =>{
initTemplate()
addForm()
}