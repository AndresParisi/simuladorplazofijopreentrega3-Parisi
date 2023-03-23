//simulador de plazo fijo//
//1-Coloque su nombre y apellido//
//2-Si no coloca un nombre, es una entrada invalida//
//3-Ingrese el capital a invertir//
//4-Ingrese el plazo en meses si es menor a 3 no es valido//
//4-La constante interes calcula el interes segun el monto ingresa y la cantidad de meses deseados con la tasa nominal anual argentina (TNA)//
//5-Luego se muestra mediante una ecuacion la cual calcula el interes por el plazo para luego multiplicarlo por el capital deseado, esto da la ganancia//
//6-Por ultimo suma el capital mas la ganancia y le arroja el total de la inversion mas la ganancia lograda en el plazo seleccionado//
//7-Obtiene un desglose completo de su inversion y retorno tanto en alert como en html//
//8-Los datos son almacenados correctamente en el DOM//
//9-Los filtros aparecen por console.log correctamente//

const INTERES = 0.0625;
let mensajes = [];

function calcularDesglose(nombre, capital, plazo) {
  let ganancia = capital * (INTERES * plazo);
  let total = capital + ganancia;

  let desglose = {
    nombre,
    capital,
    plazo,
    ganancia,
    total,
  };

  mensajes.push(desglose);
  localStorage.setItem("mensajes", JSON.stringify(mensajes)); // Guardar en el almacenamiento

  console.log(`Nuevo mensaje:`, desglose);

  let mensaje = document.createElement("div");
  mensaje.innerHTML = `Bienvenido ${nombre},
  <br><br>Vea debajo el desglose de su inversión:
  <br><br>Capital: ${capital}
  <br>Plazo: ${plazo}
  <br>Interes Generado: ${ganancia}
  <br>Total: ${total}
  <br>TNA: 75%`;
  document.body.appendChild(mensaje);

  let titulo = document.createElement("h1");
  titulo.innerHTML = `Bienvenido ${nombre},`;
  document.body.insertBefore(titulo, document.body.firstChild);
}

function pedirDatos() {
  let nombre = prompt("Ingrese su nombre y apellido");
  while (!nombre) {
    nombre = prompt("Entrada invalida, Ingrese su nombre y apellido");
  }

  let capital = Number(
    prompt(`Gracias ${nombre}, \n\nIngrese capital a invertir`)
  );
  while (!capital) {
    capital = Number(prompt(`Entrada invalida, Ingrese capital a invertir`));
  }

  let plazo = Number(prompt(`Ingrese plazo en meses`));
  while (!plazo) {
    plazo = Number(prompt(`Entrada invalida, Ingrese plazo en meses`));
  }

  if (plazo < 3) {
    let mensajeError = document.createElement("div");
    mensajeError.innerHTML = `Lo siento ${nombre}, el plazo mínimo para esta inversión es de 3 meses`;
    document.body.appendChild(mensajeError);
  } else {
    calcularDesglose(nombre, capital, plazo);
  }
}

function filtrarNombre(data) {
  let nombreFiltrado = prompt(`Ingrese el nombre que desee filtrar`);
  let dataFiltrada = data.filter((item) => item.nombre === nombreFiltrado);

  let mensajeFiltrado = document.createElement("div");
  mensajeFiltrado.innerHTML = `Calculos filtrados por nombre: ${nombreFiltrado}`;

  for (let item of dataFiltrada) {
    let itemDiv = document.createElement("div");
    itemDiv.innerHTML = `Capital: ${item.capital}
    <br>Plazo: ${item.plazo}
    <br>Interes Generado: ${item.ganancia}
    <br>Total: ${item.total}
    <br>TNA: 75%`;
    mensajeFiltrado.appendChild(itemDiv);
  }

  document.body.appendChild(mensajeFiltrado);
}

document.getElementById("boton").addEventListener("click", pedirDatos);

document.getElementById("filtrarNombre").addEventListener("click", function () {
  filtrarNombre(mensajes);
});
