// Esta función se ejecuta cuando la ventana ha terminado de cargar
window.onload = function () {

    // Esta función se ejecuta cuando se hace clic en el botón con id "calcular-cuota"
    document.getElementById("calcular-cuota").onclick = function () {

        const precioAuto = 5000000;

        // Obtener el valor seleccionado en el campo de selección de cuotas
        const selectCuotas = document.getElementById("cuotas");
        let cantCuotas = selectCuotas.options[selectCuotas.selectedIndex].value;

        let cuota = null;

        //Seleccion de Cuotas
        switch (cantCuotas) {
            case "":
                alert("Seleccione una opcion para calcular el precio")
                cuota = "Precio por cada cuota";
                break;
            case "1":
                cuota = (precioAuto * 0.95).toFixed(2) + "$";
                break;
            case "2":
                cuota = (precioAuto / 6).toFixed(2) + "$";
                break;
            case "3":
                cuota = (precioAuto * 1.05 / 12).toFixed(2) + "$";
                break;
            case "4":
                if (document.getElementById("plan-fiat").checked) {
                    cuota = (precioAuto * 1.10 / 24).toFixed(2) + "$";
                } else {
                    // Si no pertenece al plan Fiat, mostrar alerta y reiniciar selección
                    alert("Debe pertenecer al plan fiat para elegir esta opcion")
                    document.getElementById("cuotas").selectedIndex = 0;
                    cuota = "Precio por cada cuota";
                }

                break;
        }
        // Actualizar el contenido del elemento
        document.getElementById("texto-calcular-cuotas").innerHTML = cuota;
    }
};

//Auto canvas

const myCanvas = document.getElementById("myCanvas");

const ctx = myCanvas.getContext("2d");

// Posición inicial y velocidad del auto
let x = 50;
let y = myCanvas.height / 2;
let dx = 2;
let dy = -2

// Función para dibujar el auto
function drawCar(color) {
    ctx.clearRect(0, 0, myCanvas.width, myCanvas.height); // Limpia el canvas
    ctx.fillStyle = color;
    ctx.fillRect(x, y - 10, 60, 20); // Cuerpo del auto
    ctx.fillRect(x + 10, y - 20, 40, 10); // Techo del auto
    ctx.fillStyle = "black";
    ctx.fillRect(x + 15, y - 20, 10, 10); // Ventana izquierda
    ctx.fillRect(x + 35, y - 20, 10, 10); // Ventana derecha
    ctx.beginPath();
    ctx.arc(x + 15, y + 7, 8, 0, Math.PI * 2, false); // Rueda izquierda
    ctx.arc(x + 45, y + 7, 8, 0, Math.PI * 2, false); // Rueda derecha
    ctx.closePath();
    ctx.fillStyle = "black";
    ctx.fill(); //Rellenar
}

// Función para actualizar la posición del auto y manejar colisiones con los bordes
function updateCar() {
    // Verifica si el auto ha choco con alguna pared horizontal
    if (x + dx > myCanvas.width - 60 || x + dx < 0) {
        dx = -dx; // Inverte la dirección horizontal cuando choca
    }

    // Verifica si el auto ha choco con alguna pared virtical
    if (y + dy > myCanvas.height - 10 || y + dy < 15) {
        dy = -dy; // Inverte la dirección vertical cuando choca
    }

    x += dx; // Actualizar la posición x del auto
    y += dy; // Actualizar la posición y del auto

    drawCar(); // Redibujar el auto
}

// // Función para animar el canvas, llamando a la función updateCar y drawCar repetidamente
function animar() {
    requestAnimationFrame(animar); //Solicita que de ejecute "Animar", antes del repintado
    updateCar();

    //Color del auto
    const colorSelector = document.getElementById("colorSelector");
    const selectedColor = colorSelector.value;
    drawCar(selectedColor);
}

// Iniciar la animación
animar();