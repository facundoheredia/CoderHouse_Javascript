//=======================================================================
//                               CLASES
//=======================================================================
// CLASE MODULO
/// @brief Constructor contenedor con los datos de cada modulo
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

// CLASE VIVIENDA
/// @brief Clase con los datos finales de la vivienda presupuestada
/// presupuesto     -> monto final sumando los precios de cada modulo pedido
/// cantidadModulos -> cantidad final del total de modulos de la vivienda
/// modulos         -> cada modulo que conforma la vivienda presupuestada
class Vivienda {
    constructor(presupuesto,cantidadModulos,modulos) {
        this.presupuesto = presupuesto;
        this.cantidadModulos = cantidadModulos;
        this.modulos = modulos;
    }
}

//=======================================================================
//                             EXPORTACIONES
//=======================================================================

//CLASES EXPORTADAS
export {ModuloVivienda, Vivienda};