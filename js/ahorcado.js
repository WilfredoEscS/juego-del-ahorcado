//Selectores
let listaDePalabras = [
  "HTML",
  "JAVASCRIPT",
  "ALURA",
  "ORACLE",
  "CSS",
  "ELSALVADOR",
  "CHALLENGE",
];
let letrero = document.getElementById("letrero").getContext("2d");
let tablero = document.getElementById("ahorcado").getContext("2d");
let palabraSecreta = "";
let letras = [];
let errores = 6;

//Palabra secreta
function seleccionarPalabraSecreta() {
  let palabra =
    listaDePalabras[Math.floor(Math.random() * listaDePalabras.length)];
  palabraSecreta = palabra;
  console.log(palabraSecreta);
}

//verificar si la tecla que fue presionada es una letra
function verificarTecla(key) {
  let estado = false;
  if (
    (key >= 65 && letras.indexOf(key)) ||
    (key <= 90 && letras.indexOf(key))
  ) {
    letras.push(key);
    console.log(key);
    return estado;
  } else {
    estado = true;
    console.log(key);
    return estado;
  }
}

// Mostrar en pantalla las letras que esten en la palabra secreta
function mostrarLetraCorrecta(index) {
  letrero.font = "bold 38px Space Mono";
  letrero.lineWidth = 5;
  letrero.lineCap = "round";
  letrero.lineJoin = "round";
  letrero.fillStyle = "#0A3871";

  let anchura = 25;
  let posicion = (360 - palabraSecreta.length * 35) * 0.5;

  letrero.fillText(palabraSecreta[index], posicion + index * 35, 50, anchura);
  letrero.stroke();
}

//Mostrar en la pantalla las letras seleccionadas que no estan en la palabra secreta
function mostrarLetraIncorrecta(letra, error) {
  letrero.font = "bold 24px Space Mono";
  letrero.lineWidth = 5;
  letrero.lineCap = "round";
  letrero.lineJoin = "round";
  letrero.fillStyle = "#000000";
  letrero.fillText(letra, 26 * (9 - error), 90);
  letrero.stroke();
}

function agregarError() {
  errores -= 1;
}

//Iniciar juego
function iniciarJuego() {
  document.getElementById("pantalla-botones").style.display = "none";
  document.getElementById("pantalla-juego").style.display = "grid";
  document.getElementById("cuerpo").style.gridTemplateAreas =
    '"encabezado" "canvas" "pie-pagina"';

  seleccionarPalabraSecreta();
  dibujarGuiones();

  //Se ejecuta al pulsar una tecla y la convierte en mayuscula
  document.onkeydown = (e) => {
    let letra = e.key.toUpperCase();
    if (verificarTecla(letra) && palabraSecreta.includes(letra)) {
      for (let i = 0; i < palabraSecreta.length; i++) {
        if (palabraSecreta[i] === letra) {
          mostrarLetraCorrecta(i);
        }
      }
    } else {
      agregarError(letra);
      console.log(errores);
      mostrarLetraIncorrecta(letra, errores);
    }
  };
}

//Guiones de la palabra secreta
function dibujarGuiones() {
  let numeroDeEspacios = palabraSecreta.length;
  let anchura = 25;
  let separacion = 10;
  let posicion = (360 - palabraSecreta.length * 35) * 0.5;

  letrero.lineWidth = 4;
  letrero.lineCap = "round";
  letrero.lineJoin = "round";
  letrero.fillStyle = "#E5E5E5";
  letrero.strokeStyle = "#0A3871";

  letrero.fillRect(0, 0, 350, 100);
  letrero.beginPath();
  letrero.moveTo(posicion, 60);
  for (let i = 0; i < numeroDeEspacios; i++) {
    posicion = posicion + anchura;
    letrero.lineTo(posicion, 60);
    letrero.stroke();
    posicion = posicion + separacion;
    letrero.moveTo(posicion, 60);
  }
}
