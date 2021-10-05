
const log = console.log
const edadMax = 100
const edadMin = 18
const usuarios = ['Uriel', 'Santiago', 'Nestor']
const userData = {
        nombre: "Uriel",
        apellido: "Vottero",
        edad: 32,
        email: "uriel@vottero.com",
        nombre: "Santiago",
        apellido: "Vottero",
        edad: 32,
        email: "uriel@vottero.com"
    }
let edad, nombre

/* Ingresa su edad */

function pedirEdad() {
    edad = parseInt(prompt("Que edad tenes?"))

    if (isNaN(edad)) {
        alert('La edad tiene que ser un numero') /* si no cumple con la condicion de ser numero, no ingresa*/
        pedirEdad()
    } else {
        if (edad >= edadMin){ /* si su edad es mayor o igual a edadMIn, puede ingresar*/
            log("%cok, podes ingresar", 'color:#FFF; background:#F00; padding:10px;');
    
            if (edad >= edadMin && edad <= edadMax) { /* si tu edad es mayor a edad min y y menor a edad max, tu edad esta entre edadMin y edadMax*/
                log(`Tu edad esta entre ${edadMin} y ${edadMax} años`);
            } else {
                log('Sos mayor de ' + edadMax + " años ") /* si tu edad es mayor a edadMax, sos mayor de 1000 años */
            }
    
        } else {
            log("No podes ingresar, sos menor de " +edadMin+ " años") /* si tu edad es menor a edadMin, no puedes ingresar*/
        }
    }
}


function pedirNombre() {
    nombre = prompt("Ingresa tu nombre")
    if(usuarios.some(names => nombre === names)) { /* El método some() comprueba si al menos un elemento del array cumple con la condición implementada por la función proporcionada. si no comprueba vuelve a false*/
        alert(`Bienvenido ${nombre}`) /* si es true, ingresa, BIEVENIDO URIEL*/
        if(nombre === userData.nombre) {
            console.table(userData)
        }
        return true
    } else {
        log(`El usuario no existe.`) /* Si no comprueba, el usuario no existe*/
        return false
    }
}

if(pedirNombre()) {
    pedirEdad()
}


var texto = document.getElementById("texto_lineas");
var boton = document.getElementById("botoncito");
boton.addEventListener("click", dibujoPorClick );

var d = document.getElementById("dibujito");
var ancho = d.width;
var lienzo = d.getContext("2d");

function dibujarLinea(color, xinicial, yinicial, xfinal, yfinal)
{
  lienzo.beginPath();
  lienzo.strokeStyle = color;
  lienzo.moveTo(xinicial, yinicial);
  lienzo.lineTo(xfinal, yfinal);
  lienzo.stroke();
  lienzo.closePath();
}

function dibujoPorClick()
{
  var lineas = parseInt(texto.value);
  var l = 0;
  var yi, xf;
  var colorcito = "#FAA";
  var espacio = ancho / lineas;

  for(l = 0; l < lineas; l++)
  {
    yi = espacio * l;
    xf = espacio * (l + 1);
    dibujarLinea(colorcito, 0, yi, xf, 300);
    console.log("Linea " + l);
  }

  dibujarLinea(colorcito, 1,1,1,299);
  dibujarLinea(colorcito, 1,299,299,299);
}






function sumar(x,y) {
    alert("${x} + ${y} = ${x+y}");
}

sumar(2, 3);