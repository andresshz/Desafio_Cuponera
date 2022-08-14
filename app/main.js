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

const initTemplate = ()=>{
const template = `
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
}else{
    alert('Formato incorrecto!!!')
    return;
}
form.reset()
}
}
window.onload = () =>{
initTemplate()
addForm()
}