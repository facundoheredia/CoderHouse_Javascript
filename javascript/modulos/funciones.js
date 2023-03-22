//=======================================================================
//                             IMPORTACIONES
//=======================================================================
// MODULOS IMPORTADOS
import { Vivienda } from "./clases.js";
import { modulos } from "./modulos.js";

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
  const montoVivienda = document.querySelector("#montoVivienda");
  const cantidadModulos = document.querySelector("#cantidadModulos");
  const detalleModulos = document.querySelector("#detalleModulos");
  
  if (detalleModulos.childElementCount != 0) {
    borrarListaExistente ();
  }

  montoVivienda.innerText = `U$D ${viviendaFinal.presupuesto}`;
  cantidadModulos.innerText = `${viviendaFinal.cantidadModulos}`;
  for (const modulo of viviendaFinal.modulos) {
    detalleModulos.innerHTML += `<li>${modulo.nombre} - U$D ${modulo.precio} - Cantidad: ${modulo.cantidad} </li>`;
  }
}

// FUNCION BORRAR LISTA
/// @brief Funcion que se encarga de borrar los nodos de la lista de detalle de modulos cuando se presupuesta
function borrarListaExistente () {
  let listaNodos = document.querySelector("#detalleModulos").querySelectorAll("li");
  
  for (let i=0; i < listaNodos.length; i++) {
    listaNodos[i].remove();
  }
}

// FUNCION PRESUPUESTAR VIVIENDA AL APRETAR BOTON
/// @brief Funcion principal que se llama al apretar el boton
/// modulosPedidos  -> array que guarda los datos de cada modulo pedido
/// viviendaArmada  -> array que guarda los datos finales de la vivienda completa
function presupuestarVivienda() {
  const modulosPedidos = verificarModulos(modulos);

  if (modulosPedidos.length == 0) {
    alert("PARA PRESUPUESTAR POR FAVOR AGREGA AL MENOS UN MODULO");
  } else {
    const viviendaArmada = armadoVivienda(modulosPedidos);
    mostrarPresupuesto(viviendaArmada);
  }
}

//=======================================================================
//                             EXPORTACIONES
//=======================================================================

// FUNCIONES EXPORTADAS
export { presupuestarVivienda };
