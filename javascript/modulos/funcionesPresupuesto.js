//=======================================================================
//                             IMPORTACIONES
//=======================================================================

// MODULOS IMPORTADOS
import { getTodosLosPresupuestosApi } from "./sessionStorage.js";

//=======================================================================
//                             FUNCIONES PRINCIPALES
//=======================================================================

/// FUNCION PRESUPUESTO ENCARGADO
/// @brief Funcion que se encarga de cargar los datos desde la API del ultimo presupuesto encargado
///
/// cargarPresupuesto -> se encarga de obtener todos los presupuestos
/// ultimoPresupuesto -> obtiene los datos del ultimo presupuesto del array de la API
/// datosCliente -> se guardan los datos del cliente del presupuesto
async function presupuestoEncargado () {
    const cargarPresupuestos = await getTodosLosPresupuestosApi();
    const ultimoPresupuesto = await cargarPresupuestos[cargarPresupuestos.length - 1];
 
    return ultimoPresupuesto;
}

async function insertarDatosPresupuesto (presupuesto) {
    const {datosCliente,viviendaCliente, id} = presupuesto;
    const {valorVivienda, cantidadModulosVivienda, modulosVivienda} = viviendaCliente;
    const {cantidadCuotas, valorCuotas, montoFinalViviendaConCuotas} = valorVivienda;

    insertarDatosPresupuestoCliente (id, datosCliente);
    insertarDatosPresupuestoModulos (modulosVivienda);
    insertarDatosPresupuestoPie (modulosVivienda,cantidadModulosVivienda);
    insertarDatosPago (cantidadCuotas, valorCuotas, montoFinalViviendaConCuotas);
}

async function insertarDatosPresupuestoCliente (id, datosCliente) {
    const {nombreCliente, apellidoCliente} = datosCliente;

    const datoNombreCliente = document.querySelector("#seccionPresupuesto_Lista_Encabezado");    

    datoNombreCliente.innerHTML = 
    `<div class="d-flex flex-column">
        <div class="d-flex flex-row">
            <p class="ps-2 m-0 fw-bold">PRESUPUESTO</p>
            <p class="ps-2 m-0">N° ${id}</p>
        </div>
    </div>
    <div class="d-flex flex-row">
        <div class="d-flex flex-row">
            <p class="ps-2 m-0 fw-bold">NOMBRE:</p>
            <p class="ps-2 m-0">${nombreCliente}</p>
        </div>
        <div class="d-flex flex-row">
            <p class="ps-2 m-0 fw-bold">APELLIDO:</p>
            <p class="ps-2 m-0 me-2">${apellidoCliente}</p>
        </div>
    </div>`;
}

async function insertarDatosPresupuestoModulos (modulosVivienda) {
    const listaModulosViviendaCliente = document.querySelector("#seccionPresupuesto_Lista_Modulos_ElementosSeleccionados");

    for (const modulo of modulosVivienda) {
        listaModulosViviendaCliente.innerHTML += 
        `<tr id=lista-${modulo.moduloId}>
            <th scope="row"><img src=../${modulo.moduloIcono} height="32px" width="32px" alt=${modulo.moduloNombre} style="filter: invert(100%)"></th>
            <td>${modulo.moduloNombre}</td>
            <td>${modulo.moduloCantidad}</td>
            <td>U$D ${modulo.moduloPrecio}</td>
        </tr>`;
    }
}

async function insertarDatosPresupuestoPie (modulosVivienda,cantidadModulosVivienda) {
    const pieViviendaCliente = document.querySelector("#seccionPresupuesto_Lista_Modulos_Pie");
    let montoTotalModulos = 0;

    for(const modulo of modulosVivienda) {
        montoTotalModulos += modulo.moduloPrecio;
    }

    pieViviendaCliente.innerHTML = 
    `<tr class="fw-bold">
        <td colspan="2">TOTALES</td>
        <td>${cantidadModulosVivienda}</td>
        <td>U$D ${montoTotalModulos}</td>
    </tr>`;
}

async function insertarDatosPago (cantidadCuotas, valorCuotas, montoFinalViviendaConCuotas) {
    const seccionMontoPagar = document.querySelector("#seccionPresupuesto_Lista_Pie");

    seccionMontoPagar.innerHTML = 
    `<div class="d-flex flex-column">
        <div class="d-flex flex-row">
            <p class="ps-2 m-0 fw-bold">CANTIDAD CUOTAS:</p>
            <p class="ps-2 m-0">${cantidadCuotas}</p>
        </div>
        <div class="d-flex flex-row pe-2">
            <p class="ps-2 m-0 fw-bold">MONTO CUOTAS:</p>
            <p class="ps-2 m-0">U$D ${valorCuotas}</p>
        </div>
    </div>
    <div class="d-flex flex-row pe-2 bg-dark text-light fw-bold">
        <p class="ps-2 m-0">MONTO TOTAL A PAGAR:</p>
        <p class="ps-2 m-0">U$D ${montoFinalViviendaConCuotas}</p>
    </div>`;
}

//=======================================================================
//                             EXPORTACIONES
//=======================================================================

// FUNCIONES EXPORTADAS
export { presupuestoEncargado, insertarDatosPresupuesto };