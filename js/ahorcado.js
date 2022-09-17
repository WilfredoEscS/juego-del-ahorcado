//Iniciar juego
function iniciarJuego() {
    document.getElementById("pantalla-botones").style.display = "none";
    document.getElementById("pantalla-juego").style.display = "grid";
    document.getElementById("cuerpo").style.gridTemplateAreas = '"encabezado" "canvas" "pie-pagina"';
}
