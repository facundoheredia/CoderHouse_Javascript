//                              CLASES
//=======================================================================
// CLASE MODULO
/// @brief Constructor contenedor con los datos de cada modulo
///
/// nombre      -> nombre del modulo
/// precio      -> precio del modulo
/// cantidad    -> cantidad de modulos pedidos de este tipo
class Modulo {
    constructor(nombre,precio,cantidad) {
        this.nombre = nombre;
        this.precio = precio;
        this.cantidad = cantidad;
    }
}

// CLASE VIVIENDA
/// @brief Clase con los datos finales de la vivienda presupuestada
///
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

//EXPORTAR CLASES
export {Modulo, Vivienda};