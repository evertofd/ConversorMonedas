let form = document.getElementById("cambios");
let selectMoneda = document.getElementById("moneda");
let monto = document.getElementById("monto");

const obtenerDatos = async () => {
  try {
    const response = await fetch("https://mindicador.cl/api");
    const result = await response.json();
    return result;
  } catch (error) {
    alert("No se pudo obtener la información");
  }
};


const obtenerSelectores = async () => {
  let monedas = await obtenerDatos();
  let selectores = "";
  for (moneda in monedas) {
    if (
      monedas[moneda]["codigo"] !== undefined ||
      monedas[moneda]["nombre"] !== undefined
    ) {
      selectores += ` <option value="${monedas[moneda]["codigo"]}">${monedas[moneda]["nombre"]}</option>`;
    }
  }
  selectMoneda.innerHTML += selectores;
};

obtenerSelectores();

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  if (selectMoneda.value != "Seleccione moneda" && monto.value.trim() !== "") {
    let monedas = await obtenerDatos();
    let tipoSeleccionado = selectMoneda.value;
    let valorSeleccionado = monedas[tipoSeleccionado].valor;
    let conversion = monto.value * valorSeleccionado;
    document.getElementById("resultado").innerHTML = `$ ${conversion}`;
  } else {
    alert("Debes seleccionar todos los campos");
  }
});
