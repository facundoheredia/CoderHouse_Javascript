//=======================================================================
//                             IMPORTACIONES
//=======================================================================
// MODULOS IMPORTADOS
import { Vivienda } from "./clases.js";
import { modulos } from "./modulos.js";
import { setClientSessionStorageData, getSessionStorageData, setApiClientData, getApiClientData } from "./sessionStorage.js";

//=======================================================================
//                             FUNCIONES
//=======================================================================

// FUNCION VERIFICAR MODULOS
/// @brief Funcion que verifica si el modulo (tarjetas de modulos) esta seleccionado al apretar boton presupuestar
/// idModuloPedido -> variable que toma el id de la tarjeta del modulo
/// modulosPedidos -> array donde se guardan los modulos que hay sido seleccionados
/// return         -> la funcion devuelve el array con todos los modulos seleccionados
function verificarModulos(modulos) {
  let idModuloPedido;
  const modulosPedidos = [];

  modulos.forEach(element => {
    idModuloPedido = document.querySelector(`#${element.id}`);

    if(idModuloPedido.checked) {
      element.cantidad = 1;
      modulosPedidos.push(element);
    }
  });

  return modulosPedidos;
}

// FUNCION VIVIENDA ARMADA
/// @brief Funcion que construye la clase Vivienda con los modulos pedidos con los datos alojados
/// viviendaArmada          -> clase Vivienda con los datos de la vivienda presupuestada
/// presupuestoVivienda     -> obtiene el valor de cada modulo y lo acumula
/// cantidadModulosVivienda -> obtiene la cantidad de cada modulo y lo acumula
/// return                  -> devuelve la vivienda armada
function armadoVivienda(modulosPedidos) {
  let presupuestoVivienda = 0;
  let cantidadModulosVivienda = 0;

  modulosPedidos.forEach(element => {
    presupuestoVivienda += element.precio;
    cantidadModulosVivienda += element.cantidad;
  });

  const viviendaArmada = new Vivienda (presupuestoVivienda, cantidadModulosVivienda, modulosPedidos);

  return viviendaArmada;
}

// FUNCION MOSTRAR PRESUPUESTO
/// @brief Funcion que se encarga de mostar insertando en el DOM los datos de la vivienda presupuestada
/// montoVivienda   -> inserta el monto final de la vivienda en el DOM
/// cantidadModulos -> inserta la cantidad de modulos de la vivienda en el DOM
/// detalleModulos  -> inserta el detalle de los modulos en la lista generada en el DOM
function mostrarPresupuesto(viviendaFinal) {
  const detalleModulos = document.querySelector("#detalleModulos");
  
  if (detalleModulos.childElementCount != 0) {
    borrarListaExistente ();
  }

  encabezadoTablaPresupuesto(detalleModulos);
  listarElementosPresupuestados(viviendaFinal);
}

// FUNCION ENCABEZADO DE TABLA
/// @brief Funcion que se encarga de escribir el encabezado de la tabla
function encabezadoTablaPresupuesto (detalleModulos) {
  detalleModulos.innerHTML = 
  `<table class="table table-sm table align-middle">
    <thead>
      <tr>
        <th scope="col">#</th>
        <th scope="col">NOMBRE</th>
        <th scope="col">CANTIDAD</th>
        <th scope="col">PRECIO</th>
      </tr>
    </thead>
    <tbody id="tablaElementos" class="table-group-divider">
    </tbody>
  </table>`;
}

// FUNCION LISTAR ELEMENTOS PEDIDOS
/// @brief Funcion que se encarga de agregar los elementos en la tabla del presupuesto
function listarElementosPresupuestados (viviendaFinal) {
  const tablaListaElementos = document.querySelector("#tablaElementos");

  for (const modulo of viviendaFinal.modulos) {
    tablaListaElementos.innerHTML += 
    `<tr>
    <th scope="row"><img src=${modulo.icono} height="32px" width="32px" alt=${modulo.nombre} style="filter: invert(100%)"></th>
    <td>${modulo.nombre}</td>
    <td>${modulo.cantidad}</td>
    <td>U$D ${modulo.precio}</td>
    </tr>`;}

    tablaListaElementos.innerHTML += 
    `<tr class="fw-bold">
      <th scope="row"></th>
      <td>TOTAL VIVIENDA</td>
      <td>${viviendaFinal.cantidadModulos}</td>
      <td>U$D ${viviendaFinal.presupuesto}</td>
    </tr>`;
}

// FUNCION BORRAR LISTA
/// @brief Funcion que se encarga de borrar los nodos de la lista de detalle de modulos cuando se presupuesta
function borrarListaExistente () {
  let listaNodos = document.querySelector("#detalleModulos").querySelectorAll("li");
  
  for (let i=0; i < listaNodos.length; i++) {
    listaNodos[i].remove();
  }
}


// FUNCION MOSTRAR DATOS PARA ENCARGAR VIVIENDA
/// @brief Funcion que se encarga de mostrar los datos para que el cliente termine de encargar la vivienda que presupuesto
function formularioEncargarVivienda () {
  const pedirDatos = document.querySelector("#seccionPedirDatos");

  pedirDatos.innerHTML = 
  `<div class="row">
    <p class="col">
      SI DESESA PROSEGUIR, LLENE LOS DATOS QUE A CONTINUACION SE MUESTRAN PARA PODER CONFIRMAR EL PEDIDO Y COMENZAR CON LA FABRICACION DE LA VIVIENDA</p>
  </div>
  <div class="row">
    <div class="col">
      <label for="nombreCliente" class="form-label">Nombre</label>
      <input type="text" class="form-control form-control-sm" id="nombreCliente" placeholder="Nombre" required>
    </div>
    <div class="col">
      <label for="apellidoCliente" class="form-label">Apellido</label>
      <input type="text" class="form-control form-control-sm" id="apellidoCliente" placeholder="Apellido" required>
    </div>
  </div>
  <div class="row">
    <div class="col">
      <label for="cantidadCuotas" class="form-label">Cuotas</label>
      <select id="cantidadCuotas" class="form-select form-select-sm" required>
          <option value="1">1 Cuota</option>
          <option value="3">3 Cuotas</option>
          <option value="6">6 Cuotas</option>
          <option value="12">12 Cuotas</option>
          <option value="24">24 Cuotas</option>
          <option value="36">36 Cuotas</option>
      </select>
      <div class="form-text form-control-sm">
          Segun cuantas cuotas seleccione tendra un recargo distinto al monto final de la vivienda.
      </div>
    </div>
    <div class="col d-flex align-items-center">
      <p id="precioFinalCuotas" class="form-text form-control-sm"></p>
    </div>
  </div>
  <div class="row">
    <div class="d-flex justify-content-center align-items-center">
      <button id="botonEncargarVivienda" type="submit" class="btn btn-outline-dark">ENCARGAR VIVIENDA</button>
    </div>  
  </div>`;
}

// FUNCION INTERES SEGUN CUOTAS
/// @brief Funcion que modifica el monto final de la vivienda segun el monto que se elija
/// cantidadCuotas  -> parametro con el que se modifica la variable interes
/// interes         -> variable que toma el valor segun la cantidad de cuotas elegidas
/// return          -> devuelve el interes con el valor asignado
function interesSegunCantidadCuotas (cantidadCuotas) {
  let interes;
  
  switch(parseInt(cantidadCuotas)) {
    case 3:
      interes = 5;
      break;
    case 6:
      interes = 10;
      break;
    case 12:
      interes = 15;
      break;
    case 24:
      interes = 20;
      break;
    case 36:
      interes = 25;
      break;
    default:
      interes = 0;
      break;
  }

  return interes;
}

// FUNCION MONTO SEGUN CUOTAS
/// @brief Funcion que segun el valor de la vivienda presupuestada y cantidad de cuotas ingresa el valor en el html como leyenda
/// viviendaArmada      -> parametro que recibe la funcion con los datos de la vivienda presupuestada
/// cantidadCuotas      -> variable que toma el valor del input cuotas
/// interes             -> variable que toma el interes devolvido por la funcion
/// montoVivienda       -> variable que toma el valor de la propiedad de la viviendaArmada
/// montoViviendaFinal  -> variable que obtiene el valor final con el interes
/// precioCuota         -> variable que toma el valor de cada una de las cuotas a pagar
/// leyendaCuotas       -> variable que toma el id de la seccion donde insertar la leyenda del monto de cuotas y precio de cada una
function montoFinalConCuotas (viviendaArmada) {
  let cantidadCuotas = document.querySelector("#cantidadCuotas").value;
  const interes = interesSegunCantidadCuotas(cantidadCuotas);
  const montoVivienda = viviendaArmada.presupuesto;
  const montoViviendaFinal = ((montoVivienda * interes) / 100) + montoVivienda;
  const precioCuota = montoViviendaFinal / cantidadCuotas;
  const leyendaCuotas = document.querySelector("#precioFinalCuotas");

  leyendaCuotas.innerText = `Usted va a estar pagando ${cantidadCuotas} cuota/as de U$D ${precioCuota} cada una. Monto final a pagar es de U$D ${montoViviendaFinal}`;
}

// FUNCION PRESUPUESTAR VIVIENDA AL APRETAR BOTON PRESUPUESTAR
/// @brief Funcion principal que se llama al apretar el boton "presupuestar"
/// Si no hay ningun modulo seleccionado (modulosPedidos) exibira el alert con la leyenda
/// modulosPedidos  -> array que guarda los datos de cada modulo pedido llamando a la funcion verificarModulos
/// viviendaArmada  -> array que guarda los datos finales de la vivienda completa
///
/// Luego del llamado de todas las funciones guarda la vivienda en el sessionStorage
function presupuestarVivienda() {
  const modulosPedidos = verificarModulos(modulos);

  if (modulosPedidos.length == 0) {
    alert("PARA PRESUPUESTAR POR FAVOR AGREGA AL MENOS UN MODULO");
  } else {
    const viviendaArmada = armadoVivienda(modulosPedidos);
    mostrarPresupuesto(viviendaArmada);
    formularioEncargarVivienda();
    montoFinalConCuotas(viviendaArmada);
    sessionStorage.setItem('vivienda',JSON.stringify(viviendaArmada));
  }
}

// FUNCION ENCARGAR VIVIENDA AL APRETAR EL BOTON ENCARGAR VIVIENDA
/// @brief Funcion principal que se llama al apretar el boton
/// nombreCliente   -> guarda lo ingresado en el input "nombre" del formulario
/// apellidoCliente -> guarda lo ingresado en el input "apellido" del formulario
/// cantidadCuotas  -> guarda la opcion elegida en el menu desplegable "cuotas" del formulario
///
/// Si todos los inputs se encuentran completos se pueden guardar los datos en el storage
function encargarVivienda() {
  const nombreCliente = document.querySelector("#nombreCliente").value;
  const apellidoCliente = document.querySelector("#apellidoCliente").value;
  const cantidadCuotas = document.querySelector("#cantidadCuotas").value;

  if(nombreCliente != "" && apellidoCliente != "" && cantidadCuotas != "") {
    setClientSessionStorageData(nombreCliente,apellidoCliente,cantidadCuotas);
  }

  const presupuesto = getSessionStorageData ();
  setApiClientData(presupuesto);
  getApiClientData();
}

//=======================================================================
//                             EXPORTACIONES
//=======================================================================

// FUNCIONES EXPORTADAS
export { presupuestarVivienda , encargarVivienda};