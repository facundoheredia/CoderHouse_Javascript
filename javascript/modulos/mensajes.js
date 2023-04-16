//=======================================================================
//                             FUNCIONES PRINCIPALES
//=======================================================================
function mensajeModuloExistenteEnLista() {
  const Toast = Swal.mixin({
    toast: true,
    position: "bottom-end",
    color: "red",
    background: "#f8f9fa",
    showConfirmButton: false,
    timer: 2000,
    timerProgressBar: true,
  });

  Toast.fire({
    icon: "error",
    title: "Este modulo ya existe, por favor elija otro",
  });
}

function mensajeModuloAgregadoEnLista() {
  const Toast = Swal.mixin({
    toast: true,
    position: "bottom-end",
    color: "green",
    background: "#f8f9fa",
    showConfirmButton: false,
    timer: 2000,
    timerProgressBar: true,
  });

  Toast.fire({
    icon: "success",
    title: "Modulo agregado con exito",
  });
}

function mensajeModuloEliminadoEnLista() {
    const Toast = Swal.mixin({
      toast: true,
      position: "bottom-end",
      color: "green",
      background: "#f8f9fa",
      showConfirmButton: false,
      timer: 2000,
      timerProgressBar: true,
    });
  
    Toast.fire({
      icon: "success",
      title: "Modulo eliminado con exito",
    });
  }

function mensajeImprimiendoArchivo() {
    const Toast = Swal.mixin({
      toast: true,
      position: "top-middle",
      color: "green",
      background: "#f8f9fa",
      showConfirmButton: false,
      timer: 2500,
      timerProgressBar: true,
    });
  
    Toast.fire({
      icon: "success",
      title: "IMPRIMIENDO PRESUPUESTO EN PDF (?)",
    });
  }

//=======================================================================
//                             EXPORTACIONES
//=======================================================================

// FUNCIONES EXPORTADAS
export { mensajeModuloExistenteEnLista, mensajeModuloAgregadoEnLista, mensajeImprimiendoArchivo, mensajeModuloEliminadoEnLista };
