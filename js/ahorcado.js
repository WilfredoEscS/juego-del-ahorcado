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
let erroresRestantes = 6;
let letrasErroneas = [];
let letrasCorrectas = [];

//Muestra el campo para agregar una nueva palabra secreta
function nuevaPalabra() {
  document.getElementById("pantalla-botones").style.display = "none";
  document.getElementById("palabra-nueva").style.display = "grid";
  document.getElementById("cuerpo").style.gridTemplateAreas =
    '"encabezado" "nueva-palabra" "pie-pagina"';
}

function guardarPalabra() {
  let nuevaPalabraSecreta = document.getElementById(
    "nueva-palabra-secreta"
  ).value;

  if (nuevaPalabraSecreta !== "") {
    listaDePalabras.push(nuevaPalabraSecreta.toUpperCase());
    swal("¡Listo!", "Se guardó la palabra.", "success");
    document.getElementById("palabra-nueva").style.display = "none";
    document.getElementById("nueva-palabra-secreta").value = "";
    iniciarJuego();
  } else {
    swal("¡Error!", "No se ha digitado ninguna palabra.", "error");
  }
}

function volverAlInicio() {
  location.reload();
}

//Iniciar juego
function iniciarJuego() {
  document.getElementById("pantalla-botones").style.display = "none";
  document.getElementById("pantalla-juego").style.display = "grid";
  document.getElementById("cuerpo").style.gridTemplateAreas =
    '"encabezado" "canvas" "pie-pagina"';

  for (let i = letrasErroneas.length; i !== 0; i = i - 1) {
    letrasErroneas.pop();
  }
  for (let i = letrasCorrectas.length; i !== 0; i = i - 1) {
    letrasCorrectas.pop();
  }
  erroresRestantes = 6;
  tablero.clearRect(0, 0, 294, 360);
  seleccionarPalabraSecreta();
  dibujarAhorcado();
  dibujarGuiones();

  //Se ejecuta al pulsar una tecla y la convierte en mayuscula
  document.onkeydown = (e) => {
    let tecla = e.key.toUpperCase();
    if (verificarTecla(tecla)) {
      let letra = tecla;
      if (palabraSecreta.includes(tecla) && !letrasCorrectas.includes(tecla)) {
        for (let i = 0; i < palabraSecreta.length; i++) {
          if (palabraSecreta[i] === letra) {
            mostrarLetraCorrecta(i);
            agregarAcierto(palabraSecreta[i]);
            verificarGanador();
          }
        }
      } else if (
        !letrasErroneas.includes(letra) &&
        !letrasCorrectas.includes(letra) &&
        letrasCorrectas.length < palabraSecreta.length &&
        verificarLetra(e.keyCode)
      ) {
        agregarError(letra);
        console.log(erroresRestantes);
        mostrarLetraIncorrecta(letra, erroresRestantes);
        dibujarAhorcado(erroresRestantes);
        verificarFinDelJuego();
      }
    }
  };
}

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
    (key >= 65 && letrasCorrectas.indexOf(key)) ||
    (key <= 90 && letrasCorrectas.indexOf(key))
  ) {
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

  letrero.beginPath();
  letrero.fillText(palabraSecreta[index], posicion + index * 35, 50, anchura);
  letrero.stroke();
  letrero.closePath();
}

//Mostrar en la pantalla las letras seleccionadas que no estan en la palabra secreta
function mostrarLetraIncorrecta(letra, error) {
  letrero.font = "bold 24px Space Mono";
  letrero.lineWidth = 5;
  letrero.lineCap = "round";
  letrero.lineJoin = "round";
  letrero.fillStyle = "#000000";
  letrero.beginPath();
  if (erroresRestantes >= 0) {
    letrero.fillText(letra, 26 * (9 - error), 90);
    letrero.stroke();
    letrero.closePath();
  }
}

//Almacena los errores y aciertos del jugador
function agregarError(letra) {
  erroresRestantes -= 1;
  letrasErroneas.push(letra);
  console.log(letrasErroneas);
}
function agregarAcierto(letra) {
  letrasCorrectas.push(letra);
  console.log(letrasCorrectas);
}

//Evita que las los numeros y otras teclas sean tomados como errores
function verificarLetra(keyCode) {
  if (typeof keyCode === "number" && keyCode >= 65 && keyCode <= 90) {
    return true;
  } else {
    return false;
  }
}

//Verifica cuantos intentos le quedan al jugador
function verificarFinDelJuego() {
  if (erroresRestantes === 0) {
    finDelJuego();
    for (let i = 0; i < palabraSecreta.length; i++) {
      mostrarLetraCorrecta(i);
    }
  }
}

//Muestra un mensaje emergente cuando el jugador agota el numero de intentos
function finDelJuego() {
  tablero.font = "bold 18px Space Mono";
  tablero.lineWidth = 5;
  tablero.lineCap = "round";
  tablero.lineJoin = "round";
  tablero.fillStyle = "#ff2208";
  tablero.beginPath();
  tablero.fillText("¡Fin del Juego!", 83, 30);
  tablero.stroke();
  tablero.closePath();
}

//Verifica cuantas letras le restan por adivinar al jugador
function verificarGanador() {
  if (letrasCorrectas.length === palabraSecreta.length) {
    escribirFelicitacion();
  }
}

//Escribe una felicitacion al jugador cuando acierta la palabra secreta
function escribirFelicitacion() {
  tablero.font = "bold 18px Space Mono";
  tablero.lineWidth = 5;
  tablero.lineCap = "round";
  tablero.lineJoin = "round";
  tablero.fillStyle = "#1ab219";
  tablero.beginPath();
  tablero.fillText("¡Felicidades,", 95, 30);
  tablero.fillText("ganaste!", 123, 50);
  tablero.stroke();
  tablero.closePath();
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
//Dibujar horca
function dibujarAhorcado(oportunidades) {
  tablero.lineWidth = 6;
  tablero.lineCap = "round";
  tablero.lineJoin = "round";
  tablero.strokeStyle = "#0A3871";

  //Base de la horca
  tablero.beginPath();
  tablero.moveTo(3, 357);
  tablero.lineTo(291, 357);

  //Poste
  tablero.moveTo(80, 357);
  tablero.lineTo(80, 3);
  tablero.lineTo(253, 3);
  tablero.lineTo(253, 45);
  tablero.stroke();

  //cabeza
  if (oportunidades === 5) {
    tablero.moveTo(288, 80);
    tablero.arc(253, 80, 35, 0, 2 * Math.PI);
  }

  //Abdomen
  if (oportunidades === 4) {
    tablero.moveTo(253, 115);
    tablero.lineTo(253, 250);
  }

  //Brazo izquierdo
  if (oportunidades === 3) {
    tablero.moveTo(253, 125);
    tablero.lineTo(220, 180);
  }

  //Brazo derecho
  if (oportunidades === 2) {
    tablero.moveTo(253, 125);
    tablero.lineTo(286, 180);
  }

  //Pierna izquierda
  if (oportunidades === 1) {
    tablero.moveTo(253, 250);
    tablero.lineTo(220, 305);
  }

  //Pierna derecha
  if (oportunidades === 0) {
    tablero.moveTo(253, 250);
    tablero.lineTo(286, 305);
  }
  tablero.stroke();
  tablero.closePath();
}
