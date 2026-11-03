// Función de ayuda para todos los ejercicios.
// mostrar(...) escribe en el recuadro negro de la página Y en la consola (F12).
function mostrar(...valores) {
    const salida = document.getElementById("salida");
    const texto = valores
        .map((v) => (typeof v === "object" && v !== null ? JSON.stringify(v) : String(v)))
        .join(" ");
    salida.textContent += texto + "\n";
    console.log(...valores);
}
