const impuesto = 1.21;
const descuento = 0.1;
const precioProductos = [25,30,40,50,60]

const productos = `seleccione el numero del producto a comprar:
    1-vaso ($${precioProductos[0]})
    2-plato ($${precioProductos[1]})
    3-tenedor ($${precioProductos[2]})
    4-cuchillo ($${precioProductos[3]})
    5-cuchara ($${precioProductos[4]})`
let productoConImpuesto

function seleccionarProducto(){
    let productoSeleccionado = parseInt(prompt(productos))
    
    if(isNaN(productoSeleccionado)) {
        seleccionarProducto()
    } else {
        if (productoSeleccionado >=1 && productoSeleccionado <=5){
            calcularImpuestos(productoSeleccionado)
            solicitarCupon()
        } else {
            seleccionarProducto()
        }   
    }
}

function calcularImpuestos(productoSeleccionado){
    productoConImpuesto = precioProductos[productoSeleccionado-1] * impuesto
}

function solicitarCupon() {
    const codigoCupon = prompt("Si tiene un cupon de descuento, ingrese el codigo")

    if (codigoCupon === "") {
        alert (productoConImpuesto)
    } else if (codigoCupon === "Cupon2021") {
        alert( productoConImpuesto - (productoConImpuesto * descuento))
    } else {
        alert ("codigo ingresado no valido. Por favor ingrese un codigo valido o precione continuar")
        solicitarCupon()
    }
}

seleccionarProducto()