//=======================================================================
//                             IMPORTACIONES
//=======================================================================

// MODULOS IMPORTADOS
import { Vivienda , Presupuesto, Cliente} from "./clases.js";
import { modulos , listaModulosSeleccionados } from "./modulos.js";
import { setClientSessionStorageData, getSessionStorageData, setCrearPresupuestoApi, getTodosLosPresupuestosApi , setDatosPresupuestoEnApi } from "./sessionStorage.js";
import { mensajeModuloExistenteEnLista, mensajeModuloAgregadoEnLista, mensajeModuloEliminadoEnLista } from "./mensajes.js";

//=======================================================================
//                             FUNCIONES PRINCIPALES
//=======================================================================

/// FUNCION PRINCIPAL PARA AGREGAR MODULO A LA LISTA
/// @brief Funcion principal que se encarga de agregar a la lista el modulo seleccionado cuando se apreta el boton "encargar" del modulo
/// Si se agrega al menos un modulo (cambiando el largo del array) hace insertar las distintas partes de la tabla de modulos para encargar
///
/// Recorre el array "modulos" para identificar el boton de cada uno en el html y llama a funciones secundarias para el resto del proceso 
function agregarModuloSeleccionado () {
  modulos.forEach(modulo => {
    let idBotonModulo = document.querySelector(`#botonEncargar-${modulo.id}`);
    idBotonModulo.addEventListener("click", function() {
      agregarModulo (modulo);
      if(listaModulosSeleccionados.length != 0) {
        agregarEncabezadoTablaPresupuesto ();
        agregarPieTablaPresupuesto();
        if(listaModulosSeleccionados.length == 1) {
          agregarFormulario ();
        }
        montoFinalConCuotas();
      }
    })
  });
}

/// FUNCION PRINCIPAL PARA ELIMINAR MODULO DE LA LISTA
/// @brief Funcion principal que se encarga de eliminar el modulo cuando se clickea en el boton "X" de la lista de modulo seleccionados
/// Al hace click en el boton del modulo que se encuentra en la lista, este llama a la funcion que eliminar a dicho modulo de la lista
///
/// tabla -> obtiene el id de la tabla y escucha el evento click en ella
function eliminarModuloSeleccionado() {
  const tabla = document.querySelector("#seccionPresupuestar_Detalles_Table_ElementosSeleccionados");
  tabla.addEventListener("click", eliminarDatosDeModuloEnTabla);
}

//=======================================================================
//                             FUNCIONES SECUNDARIAS
//=======================================================================

/// FUNCION SECUNDARIA PARA AGEGAR MODULO
/// @brief Funcion que se encarga de recibir el modulo que se encarga
/// si el array no tiene ninguno lo agrega directamente,
/// si el array posee ya al menos un modulo verifica buscando por id si existe,
/// si existe muestra el alerta de su existencia
/// si no existe el modulo seleccionado en el array lo agrega
///
/// existeModulo -> Busca el id del modulo en el array
function agregarModulo (modulo) {
  if(listaModulosSeleccionados.length == 0) {
    cargarDatosDeModulo(modulo);
  } else {
    const existeModulo = listaModulosSeleccionados.find(({moduloId})=> moduloId === modulo.id);
    if(existeModulo) {
      mensajeModuloExistenteEnLista();
    } else {
      cargarDatosDeModulo (modulo);
    }
  }
}

/// FUNCION PARA CARGAR LOS DATOS DEL MODULO A LA LISTA Y TABLA
/// @brief Funcion que encapsula las 2 partes de agregar los datos del modulo, tanto al array como a la lista html
function cargarDatosDeModulo (modulo) {
  cargarDatosDeModuloEnLista (modulo);
  cargarDatosModuloEnTabla (modulo);
  mensajeModuloAgregadoEnLista();
}

/// FUNCION CARGA DE DATOS EN EL ARRAY
/// @brief Funcion que pushea en el array los datos del modulo seleccionado
function cargarDatosDeModuloEnLista (modulo) {
  listaModulosSeleccionados.push({moduloId:modulo.id,
                                  moduloNombre:modulo.nombre,
                                  moduloCantidad:modulo.cantidad + 1,
                                  moduloIcono:modulo.icono,
                                  moduloPrecio:modulo.precio});
}

/// FUNCION CARGA DE DATOS EN LISTA HTML
/// @brief Funcion que se encarga de insertar en la tabla html los datos del modulo seleccionado
/// segun los datos del ultimo modulo agregado al array usa los datos para insertarlo en la lista html
///
/// tablaListaElementos -> Obtiene el id de la seccion donde insertar en la tabla
/// ultimoModuloLista   -> Obtiene el ultimo elemento del array con sus datos
function cargarDatosModuloEnTabla () {
  const tablaListaElementos = document.querySelector("#seccionPresupuestar_Detalles_Table_ElementosSeleccionados");
  const ultimoModuloLista = listaModulosSeleccionados[listaModulosSeleccionados.length-1];
  
  tablaListaElementos.innerHTML += 
  `<tr id=lista-${ultimoModuloLista.moduloId}>
  <th scope="row"><img src=${ultimoModuloLista.moduloIcono} height="32px" width="32px" alt=${ultimoModuloLista.moduloNombre} style="filter: invert(100%)"></th>
  <td>${ultimoModuloLista.moduloNombre}</td>
  <td>${ultimoModuloLista.moduloCantidad}</td>
  <td>U$D ${ultimoModuloLista.moduloPrecio}</td>
  <td><button class="btn btn-outline-dark botonBorrar" id="botonBorrar-${ultimoModuloLista.moduloId}">X</button></td>
  </tr>`;
}

/// FUNCION AGREGAR ENCABEZADO DE TABLA
/// @brief Funcion que se encarga de agregar el encabezado de la tabla con la lista de modulos que se seleccionan
///
/// tablaEncabezado -> obtiene el id de la seccion (<thead>) de la tabla donde insertar el encabezado en el html
function agregarEncabezadoTablaPresupuesto () {
  const tablaEncabezado = document.querySelector("#seccionPresupuestar_Detalles_Tabla_Encabezado");
  tablaEncabezado.innerHTML = 
  `<tr>
  <th scope="col">#</th>
  <th scope="col">NOMBRE</th>
  <th scope="col">CANTIDAD</th>
  <th scope="col">PRECIO</th>
  <th scope="col"></th>
  </tr>`;
}

/// FUNCION AGREGAR PIE DE TABLA
/// @brief Funcion que se encarga de agregar el pie de tabla con el resultado de la lista de modulos
/// Recorre el array de la lista de modulos acumulando la cantidad de modulos y el precio total
/// Luego lo inserta al pie de la tabla como resultado final
///
/// tablaPie              -> Obtiene el id de la seccion donde insertar el resultado
/// totalCantidadModulos  -> Acumula la cantidad de modulos de la lista de array
/// totalPrecioModulos    -> Acumula el precio de los modulos de la lista de array
function agregarPieTablaPresupuesto () {
  const tablaPie = document.querySelector("#seccionPresupuestar_Detalles_Tabla_Pie");
  let totalCantidadModulos = 0;
  let totalPrecioModulos = 0;

  tablaPie.innerHTML = ``;

  for(const elemento of listaModulosSeleccionados) {
      totalCantidadModulos += elemento.moduloCantidad;
      totalPrecioModulos += elemento.moduloPrecio;
  }

  tablaPie.innerHTML +=
  `<tr class="fw-bold">
  <th scope="row"></th>
  <td>TOTAL VIVIENDA</td>
  <td>${totalCantidadModulos}</td>
  <td>U$D ${totalPrecioModulos}</td>
  </tr>`;
}

/// FUNCION AGREGAR FORMULARIO
/// @brief Funcion que se encarga de insertar en el html el formulario para pedir datos al cliente
///
/// formulario -> Obtiene el id donde insertar el formulario en el html
function agregarFormulario () {
  const formulario = document.querySelector("#seccionPresupuestar_Formulario");

  formulario.innerHTML = 
  `<div class="row">
      <p class="col">SI DESESA PROSEGUIR, LLENE LOS DATOS QUE A CONTINUACION SE MUESTRAN PARA PODER CONFIRMAR EL PEDIDO Y COMENZAR CON LA FABRICACION DE LA VIVIENDA</p>
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
      <div id="seccionPresupuestar_Formulario_botonEncargarVivienda" class="d-flex justify-content-center align-items-center">
          <button id="botonEncargarVivienda" type="submit" class="btn btn-outline-dark">ENCARGAR VIVIENDA</button>
      </div>  
  </div>`;
}

/// FUNCION MONTO SEGUN CUOTAS
/// @brief Funcion que segun el valor de la vivienda y cantidad de cuotas ingresa el valor en el html como leyenda
///
/// cantidadCuotas -> obtiene el id del input (<option>) del menu desplegable de cuotas
function montoFinalConCuotas () {
  const cantidadCuotas = document.querySelector("#cantidadCuotas");
  
  datosLeyendaCuotasHtml ();
  
  cantidadCuotas.addEventListener("change", function() {
    datosLeyendaCuotasHtml ();
  })
}

/// FUNCION LEYENDA DE CUOTAS
/// @brief Funcion que se encarga de insertar en el html la leyenda con los valores de las cuotas y monto final de la vivienda
///
/// interes             -> obtiene el valor del interes segun la cantidad de cuotas seleccionadas
/// montoVivienda       -> acumula el valor de los modulos para obtener el valor final
/// montoViviendaFinal  -> obtiene el valor final de la vivienda con el interes aplicado
/// precioCuota         -> obtiene el valor de cada cuota a pagar
/// leyendaCuotas       -> obtiene el id de la seccion donde insertar la leyenda en el html
function datosLeyendaCuotasHtml () {
  const interes = interesSegunCantidadCuotas(cantidadCuotas.value);
  let montoVivienda = 0;

  for(const elemento of listaModulosSeleccionados) {
    montoVivienda += elemento.moduloPrecio;
  }

  const montoViviendaFinal = ((montoVivienda * interes) / 100) + montoVivienda;
  const precioCuota = montoViviendaFinal / cantidadCuotas.value;

  const leyendaCuotas = document.querySelector("#precioFinalCuotas");
  leyendaCuotas.innerText = `Usted va a estar pagando ${cantidadCuotas.value} cuota/as de U$D ${precioCuota.toFixed(2)} cada una. Monto final a pagar es de U$D ${montoViviendaFinal.toFixed(2)}`;
}

/// FUNCION INTERES SEGUN CUOTAS
/// @brief Funcion que modifica el monto final de la vivienda segun el monto que se elija
///
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

/// FUNCION ELIMINAR MODULO DE TABLA
/// @brief Funcion que se encarga de borrar los datos del modulo en la tabla
/// segun al apretar el boton "x" de cada modulo en la tabla lo elimina de ella
/// busca el id del boton "x" y lo compara con el array de modulos
/// cuando lo encuentra lo saca del array y actualiza los montos de la tabla y cuotas
/// si el array llega a la longitud de 0 (sin modulos) se encarga de eliminar el encabezado de la tabla, el pie y el formulario
function eliminarDatosDeModuloEnTabla (e) {
  if(!e.target.classList.contains("botonBorrar")) {
      return;
  }

  for(const elemento of listaModulosSeleccionados) {
      if(`botonBorrar-${elemento.moduloId}` === e.target.id) {
          const indice = listaModulosSeleccionados.indexOf(elemento);
          listaModulosSeleccionados.splice(indice,1);
      }
  }

  e.target.closest("tr").remove();
  mensajeModuloEliminadoEnLista();
  agregarPieTablaPresupuesto();
  montoFinalConCuotas();

  if(listaModulosSeleccionados.length == 0) {
      eliminarEncabezadoTablaPresupuesto ();
      eliminarPieTablaPresupuesto ();
      eliminarFormulario ();
  }
}

/// FUNCION ELIMINAR ENCABEZADO DE TABLA
/// @brief Funcion que se encarga de eliminar el encabezado de la tabla con la lista de modulos que se seleccionan
///
/// tablaEncabezado -> obtiene el id de la seccion (<thead>) de la tabla donde eliminar el encabezado en el html
function eliminarEncabezadoTablaPresupuesto () {
  const tablaEncabezado = document.querySelector("#seccionPresupuestar_Detalles_Tabla_Encabezado");
  tablaEncabezado.innerHTML = 
  `<tr>
  </tr>`;
}

/// FUNCION ELIMINAR PIE DE TABLA
/// @brief Funcion que se encarga de eliminar el pie de la tabla
///
/// tablaPie -> obtiene el id de la seccion (<tfoot>) de la tabla donde eliminar el pie en el html
function eliminarPieTablaPresupuesto () {
  const tablaPie = document.querySelector("#seccionPresupuestar_Detalles_Tabla_Pie");
  tablaPie.innerHTML = ``;
}

/// FUNCION ELIMINAR FORMULARIO
/// @brief Funcion que se encarga de elimnar el formulario
///
/// formulario -> obtiene el id de la seccion donde esta el formulario y lo elimina
function eliminarFormulario () {
  const formulario = document.querySelector("#seccionPresupuestar_Formulario");
  
  formulario.innerHTML = ``;
}

/// FUNCION ENCARGAR VIVIENDA AL APRETAR EL BOTON ENCARGAR VIVIENDA
/// @brief Funcion principal que se llama al apretar el boton "encargarVivienda"
/// Guarda todos los datos de la vivienda y formulario del cliente en el sessionStorage
/// nombreCliente   -> guarda lo ingresado en el input "nombre" del formulario
/// apellidoCliente -> guarda lo ingresado en el input "apellido" del formulario
/// cantidadCuotas  -> guarda la opcion elegida en el menu desplegable "cuotas" del formulario
///
/// Si todos los inputs se encuentran completos se pueden guardar los datos en el storage
async function encargarVivienda() {
  const viviendaEncargada = armadoVivienda();

  const nombreCliente = document.querySelector("#nombreCliente").value;
  const apellidoCliente = document.querySelector("#apellidoCliente").value;
  const cantidadCuotas = document.querySelector("#cantidadCuotas").value;

  if(nombreCliente != "" && apellidoCliente != "" && cantidadCuotas != "") {
    const datosCliente = new Cliente (nombreCliente,apellidoCliente);

    setClientSessionStorageData(datosCliente,viviendaEncargada);
  }
}

/// FUNCION VIVIENDA ARMADA
/// @brief Funcion que construye la clase Vivienda con los modulos pedidos con los datos alojados en el array
/// Cuando se apreta el boton "encargar vivienda" arma la clase "vivienda" y la retorna
///
/// viviendaArmada          -> clase Vivienda con los datos de la vivienda presupuestada
/// presupuestoVivienda     -> obtiene el valor final segun la cantidad de cuotas
/// cantidadModulosVivienda -> obtiene la cantidad de cada modulo y lo acumula
/// return                  -> devuelve la vivienda armada
function armadoVivienda() {
  let cantidadModulosVivienda = 0;

  for(const elemento of listaModulosSeleccionados) {
    cantidadModulosVivienda += elemento.moduloCantidad;
  }

  const presupuestoVivienda = datosCuotas ();

  const viviendaEncargada = new Vivienda (presupuestoVivienda, cantidadModulosVivienda, listaModulosSeleccionados);

  return viviendaEncargada;
}

/// FUNCION PRESUPUESTO VIVIENDA
/// @brief Funcion que se encarga de crear la clase Presupuesto con los datos seleccionados cuando se apreta el boton "encargar vivienda"
/// Calcula el interes y devuelve el valor final de la vivienda con la cantidad de cuotas
function datosCuotas () {
  const cantidadCuotas = document.querySelector("#cantidadCuotas").value;
  const interes = interesSegunCantidadCuotas(cantidadCuotas);
  let montoVivienda = 0;

  for(const elemento of listaModulosSeleccionados) {
    montoVivienda += elemento.moduloPrecio;
  }

  const montoViviendaFinal = ((montoVivienda * interes) / 100) + montoVivienda;
  const montoCuotas = montoViviendaFinal / parseInt(cantidadCuotas);
  const valorVivienda = new Presupuesto (cantidadCuotas,montoCuotas,montoViviendaFinal);
  return valorVivienda;
}

/// FUNCION GUARDAR DATOS EN API
/// @brief Funcion que se encarga de obter los datos guardados en el sessionSotage
/// y los guarda en la Api
async function subirPresupuestoApi () {
  await setCrearPresupuestoApi();
  const cargarPresupuestos = await getTodosLosPresupuestosApi();
  const idUltimoPresupuesto = cargarPresupuestos[cargarPresupuestos.length - 1].id;
  const presupuesto = getSessionStorageData ();
  await setDatosPresupuestoEnApi(presupuesto,idUltimoPresupuesto);
}

//=======================================================================
//                             EXPORTACIONES
//=======================================================================

// FUNCIONES EXPORTADAS
export { encargarVivienda, agregarModuloSeleccionado, eliminarModuloSeleccionado, subirPresupuestoApi};