//Selectores
let listaDePalabras = [
  "HTML",
  "JAVASCRIPT",
  "ALURA",
  "ORACLE",
  "EL SALVADOR",
  "LATINOAMERICA",
];
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
}
