window.onload = function () {
    document.getElementById("calcular-cuota").onclick = function () {

        const precioAuto = 5000000;
        const selectCuotas = document.getElementById("cuotas");
        let cantCuotas = selectCuotas.options[selectCuotas.selectedIndex].value;
        let cuota = null;
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
                cuota = (precioAuto * 1.05/ 12).toFixed(2) + "$";
                break;
            case "4":
                if (document.getElementById("plan-fiat").checked ) {
                    cuota = (precioAuto * 1.10 / 24).toFixed(2) + "$"; 
                } else {
                    alert("Debe pertenecer al plan fiat para elegir esta opcion")
                    document.getElementById("cuotas").selectedIndex = 0;
                    cuota =  "Precio por cada cuota";
                }
                
              break;
            }
            
        document.getElementById("texto-calcular-cuotas").innerHTML = cuota;
        }
}
//Auto canvas

    const canvas = document.getElementById("myCanvas");
    const ctx = canvas.getContext("2d");

    // Posición inicial y velocidad del auto
    let x = 50;
    let y = canvas.height / 2;
    let dx = 2;
    let dy = -2

    // Función para dibujar el auto
    function drawCar() {
        ctx.clearRect(0, 0, canvas.width, canvas.height); // Limpia el canvas
        ctx.fillStyle = "red";
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
        ctx.fill();
    }

    function updateCar() {
        // Verifica si el auto ha choco con alguna pared horizontal
        if (x + dx > canvas.width - 60 || x + dx < 0) {
            dx = -dx; // Inverte la dirección horizontal cuando choca
        }

        // Verifica si el auto ha choco con alguna pared virtical
        if (y + dy > canvas.height - 10 || y + dy < 15) {
            dy = -dy; // Inverte la dirección vertical cuando choca
        }

        x += dx; // Actualizar la posición x del auto
        y += dy; // Actualizar la posición y del auto

        drawCar(); // Redibujar el auto
    }

    // Bucle de animación
    function animar() {
        requestAnimationFrame(animar);
        updateCar();
    }

    // Iniciar la animación
    animar();