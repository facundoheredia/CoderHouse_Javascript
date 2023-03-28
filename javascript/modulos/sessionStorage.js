//=======================================================================
//                             STORAGE
//=======================================================================
// FUNCION QUE GUARDA LA INFORMACION DEL PRESUPUESTO EN EL SESSION STORAGE
function setSessionStorageData (nombreCliente,apellidoCliente,cuotasCliente,viviendaCliente) {
    sessionStorage.setItem('nombre',nombreCliente);
    sessionStorage.setItem('apellido',apellidoCliente);
    sessionStorage.setItem('cuotas',cuotasCliente);
    sessionStorage.setItem('vivienda',JSON.stringify(viviendaCliente));
}

// FUNCION QUE OBTIENE LA INFORMACION DEL PRESUPUESTO EN EL SESSION STORAGE
function getSessionStorageData () {
    const nombreCliente = sessionStorage.getItem('nombre');
    const apellidoCliente = sessionStorage.getItem('apellido');
    const cuotasCliente = sessionStorage.getItem('cuotas');
    const viviendaCliente = JSON.parse(sessionStorage.setItem('vivienda'));
    const presupuestoFinal = [nombreCliente,apellidoCliente,cuotasCliente,viviendaCliente];

    return presupuestoFinal;
}

// FUNCION QUE BORRA LA INFORMACION DEL PRESUPUESTO EN EL SESSION STORAGE
function clearSessionStorageData () {
    sessionStorage.clear()
}

//=======================================================================
//                             EXPORTACIONES
//=======================================================================

// FUNCIONES EXPORTADAS
export { setSessionStorageData, getSessionStorageData, clearSessionStorageData};