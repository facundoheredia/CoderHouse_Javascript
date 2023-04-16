//=======================================================================
//                               CLASES
//=======================================================================

/// CLASE MODULO
/// @brief Constructor contenedor con los datos de cada modulo
///
/// nombre      -> nombre del modulo
/// precio      -> precio del modulo
/// cantidad    -> cantidad de modulos pedidos de este tipo
class ModuloVivienda {
    constructor(id,nombre,descripcion,precio,cantidad,icono,tipoEspacio) {
        this.id = id;
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.precio = precio;
        this.cantidad = cantidad;
        this.icono = icono;
        this.tipoEspacio = tipoEspacio;
    }
}

/// CLASE VIVIENDA
/// @brief Clase con los datos finales de la vivienda presupuestada
///
/// valorVivienda           -> monto final sumando los precios de cada modulo pedido
/// cantidadModulosVivienda -> cantidad final del total de modulos de la vivienda
/// modulosVivienda         -> cada modulo que conforma la vivienda presupuestada
class Vivienda {
    constructor(valorVivienda,cantidadModulosVivienda,modulosVivienda) {
        this.valorVivienda = valorVivienda;
        this.cantidadModulosVivienda = cantidadModulosVivienda;
        this.modulosVivienda = modulosVivienda;
    }
}

class Presupuesto {
    constructor(cantidadCuotas,valorCuotas,montoFinalViviendaConCuotas) {
        this.cantidadCuotas = cantidadCuotas;
        this.valorCuotas = valorCuotas;
        this.montoFinalViviendaConCuotas = montoFinalViviendaConCuotas;
    }
}

/// CLASE CLIENTE
/// @brief Clase con los datos del cliente llenados en el formulario
/// 
/// nombreCliente       -> nombre del cliente insertado en el input nombre del formulario
/// apellidoCliente     -> apellido del cliente insertado en el input apellido del formulario
/// viviendaEncargada   -> vivienda con los datos obtenidos de la lista, cuotas y valor final
class Cliente {
    constructor(nombreCliente,apellidoCliente) {
        this.nombreCliente = nombreCliente;
        this.apellidoCliente = apellidoCliente;
    }
}

//=======================================================================
//                             EXPORTACIONES
//=======================================================================

//CLASES EXPORTADAS
export {ModuloVivienda, Vivienda, Presupuesto, Cliente};