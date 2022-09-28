//Selectores
let listaDePalabras = [
  "HTML",
  "JAVASCRIPT",
  "ALURA",
  "ORACLE",
  "EL SALVADOR",
  "LATINOAMERICA",
];
let letrero = document.getElementById("letrero").getContext("2d");
let tablero = document.getElementById("ahorcado").getContext("2d");
let palabraSecreta = "";

//Palabra secreta
function seleccionarPalabraSecreta() {
  let palabra =
    listaDePalabras[Math.floor(Math.random() * listaDePalabras.length)];
  palabraSecreta = palabra;
}

//Iniciar juego
function iniciarJuego() {
  document.getElementById("pantalla-botones").style.display = "none";
  document.getElementById("pantalla-juego").style.display = "grid";
  document.getElementById("cuerpo").style.gridTemplateAreas =
    '"encabezado" "canvas" "pie-pagina"';
  seleccionarPalabraSecreta();
  dibujarGuiones();
}
//Guiones de la palabra secreta
function dibujarGuiones() {
  let numeroDeEspacios = palabraSecreta.length;
  let espacio = 350 / numeroDeEspacios;
  let anchura = espacio * 0.6;
  let separacion = espacio * 0.4;
  let posicion = separacion * 0.5;

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
