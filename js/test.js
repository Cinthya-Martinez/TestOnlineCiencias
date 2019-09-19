//conexion a firebase
var firebaseConfig = {
    apiKey: "AIzaSyAaCjswAsOoKdYjqteHIVbXYgQOl8A4A88",
    authDomain: "testonline-a74a4.firebaseapp.com",
    databaseURL: "https://testonline-a74a4.firebaseio.com",
    projectId: "testonline-a74a4",
    storageBucket: "testonline-a74a4.appspot.com",
    messagingSenderId: "999986521087",
    appId: "1:999986521087:web:a83add7b56d77c2fba3dca"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

//crear nuevo usuario
function registrar() {
var correo=document.getElementById('Usuario').value;
var contra=document.getElementById('Contraseña').value;
console.log(correo)

firebase.auth().createUserWithEmailAndPassword(correo, contra).then(function(result){
    //verifiacr si es maestro o alumno
    var etiqueta=document.getElementById('exampleFormControlSelect2').value;

switch(etiqueta){
    case "1":
    window.location.href="contenido.html";
    break;
    case "2":
    window.location.href="Alumnop.html";
    break;
  }
  })

//Error 
.catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
  // ...
  console.log(errorCode);
  console.log(errorMessage);
});
}
//funcion para iniciar sesion
function ingresar() {
  var correo2=document.getElementById('exampleInputEmail1').value;
  var contra2=document.getElementById('exampleInputPassword1').value;
  firebase.auth().signInWithEmailAndPassword(correo2, contra2).then(function(result){
   // para verificar si es maestro o alumno
    var etiqueta=document.getElementById('exampleFormControlSelect1').value;

switch(etiqueta){
    case "1":
    //crea enlace
    window.location.href="contenido.html";
    break;
    case "2":
    window.location.href="Alumnop.html";
    break;
  }
  })
//mensaje de error
  .catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
  alert("Usuario o Contraseña son incorrectos");
  // ...
  
  console.log(errorCode);
  console.log(errorMessage);
});
}

//crear test
function crear_test() {
	var test=document.getElementById("contenido");
	test.style.display ="block";
		var test=document.getElementById("estadistica");
	test.style.display ="none";
    var conte = document.getElementById("contenido");
    var texto = '<form class="formulario"><div class="form-group"><label>Elegir Opcion de Test</label>'+
    '<select class="form-control"><option value="1">Grupal</option><option value="2">individual</option></select></div>'+
    '<div class="form-group"><label for="pregunta1">Pregunta #1</label>'+
    '<input type="text" class="form-control" id="pregunta1" placeholder="ingrese una pregunta"></div>'
    +'<div class="form-group"><label>Subir Imagen o Video: </label>'+
    '<input id="image" type="file" accept="image/x-png,image/x-jpg,image/x-gif" class="btn btn-primary"></div>'+
    '<div class="row"><div class="col-md12 text-center"><img id="imge" src="img/picture.png" class"img-thumbnail" width="150"/></div></div>'+
    '<div class="form-group"><label for="pregunta2">Opcion 1</label>'+
    '<input type="text" class="form-control" id="pregunta2" placeholder="ingrese una opcion"></div>'+
    '<div class="form-group"><label for="pregunta3">Opcion 2</label>'+
    '<input type="text" class="form-control" id="pregunta3" placeholder="ingrese una opcion"></div>'+
    '<div class="form-group"><label for="pregunta4">Opcion 3</label>'+
    '<input type="text" class="form-control" id="pregunta4" placeholder="ingrese una opcion"></div>'+
    '<div class="form-group"><label for="pregunta2">Opcion 4</label>'+
    '<input type="text" class="form-control" id="pregunta4" placeholder="ingrese una opcion"></div>'+
    '<div class="form-group"><input type="button" class="btn btn-primary" value="Ingresar Pregunta">'+
    '</div><div class="form-group"><input type="button" class="btn btn-primary" value="Crear Otra Pregunta"></div>'+
    '</form>';

    conte.innerHTML=texto;
}
function estadistica() {
	var test=document.getElementById("contenido");
	test.style.display = "none";
		var test=document.getElementById("estadistica");
	test.style.display = "block";
 var estad=document.getElementById("estadistica");
 var con='<h1>Estadistica de los jugadores</h1><p>Alonso Mendez Caballero: <strong>98 puntos</strong></p><p>Lucas Marquez Martínez: <strong>50 puntos</strong></p><p>Valentina Medina Benitez: <strong>25 puntos</strong></p><p>Carolina Fuentes Gonzalez: <strong>15 puntos</strong></p>';
 estad.innerHTML=con;
}
function redimensionar(srcData,width,height) {
  var imageObj = new Image(),
  canvas = document.createElement("canvas"),
  ctx = canvas.getContext('2d');
  xStart=0,
  yStart=0,
  aspectRadio,
  newWidth,
  newHeight;
imageObj.src=srcData;
canvas.width=width;
canvas.height=height;
aspectRadio=imageObj.height / imageObj.width;
if(imageObj.height < imageObj.width){
  aspectRadio=imageObj.width / imageObj.height;
  newHeight=height;
  newWidth=aspectRadio*height;
  xStart= -(newWidth - width)/2;

}else{
  newWidth=width,
  newHeight=aspectRadio*width;
  yStart= -(newHeight - height)/2;
}
ctx.drawImage(imageObj,xStart, yStart, newWidth,newHeight);
return imageObj.src; //canvas.toDataURL("image/jpeg",0.75);
}
function imagen(){
  var tablaBD=firebase.database().ref('imagenes');
  $('#image').change(function(){
    if(this.files && this.files[0]){
      var Archivo = new FileReader();
      Archivo.onload=function(e){
        var pequena=redimensionar(e.target.result,165,165);
        tablaBD.push({
          urlLarge:e.target.result,
          url:pequena
        });
        $('#imge').attr('src',pequena);
      };
      Archivo.readAsDataURL(this.files[0]);
    }
  });
}
function cerrar() {
  firebase.auth().signOut().then(function(){
    window.location.href="index.html";
  })
  }