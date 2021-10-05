/* Version mejorada usando objetos.*/

const impuesto = 1.21;
const descuento = 0.1;
const cupones = ["cupon2021", "cupon2", "cupon3"]
const productos = [{
    nombre: 'vaso',
    precio: 124,
    descuento: true
}, {
    nombre: 'plato',
    precio: 66,
    descuento: false
}, {
    nombre: 'tenedor',
    precio: 99,
    descuento: true
}, {
    nombre: 'cuchillo',
    precio: 20,
    descuento: true
}, {
    nombre: 'cuchara',
    precio: 34,
    descuento: false
}, {
    nombre: 'mantel',
    precio: 250,
    descuento: true
}]

/* USO map*/
/* const lista = productos.map((item, i) => {
        return '\n'+`${i+1} - ${item.nombre} ($${item.precio})`
    })
 */


/* Uso for */ 
let listaDos = []
function generarListaProductos (){
    for (let i=0; i<=productos.length -1; i++){
        listaDos.push ('\n'+ `${i+1} - ${productos[i].nombre} ($${productos[i].precio})`)
    }
} 

generarListaProductos ()



const listaProductos2 = `seleccione el numero del producto a comprar: ${listaDos}`
/* const listaProductos = `seleccione el numero del producto a comprar:
    1-${productos[0].nombre} ($${productos[0].precio})
    2-${productos[1].nombre} ($${productos[1].precio})
    3-${productos[2].nombre} ($${productos[2].precio})
    4-${productos[3].nombre} ($${productos[3].precio})
    5-${productos[4].nombre} ($${productos[4].precio})` */


let productoConImpuesto

async function seleccionarProducto(){

    let productoSeleccionado = prompt(listaProductos2)
    if(productoSeleccionado === null) {
        alert('adios')
        return false
    }
    
    if(isNaN(parseInt(productoSeleccionado))) {
        seleccionarProducto()
    } else {
        if (productoSeleccionado >=1 && productoSeleccionado <= productos.length){
            calcularImpuestos(productoSeleccionado)
            if (productos[productoSeleccionado-1].descuento) {
                solicitarCupon(productos[productoSeleccionado-1].nombre)
            } else {
                alert(`
        - Producto: ${productos[productoSeleccionado-1].nombre}
        - Precio final: ${productoConImpuesto}`)
            }
        } else {
            seleccionarProducto()
        }   
    }
}




function calcularImpuestos(productoSeleccionado){
    productoConImpuesto = productos[productoSeleccionado-1].precio * impuesto
}


function solicitarCupon(nombreProductoSeleccionado) {
    const codigoCupon = prompt("Si tiene un cupon de descuento, ingrese el codigo")

    if (codigoCupon === "") {
        alert(`
        - Producto: ${nombreProductoSeleccionado}
        - Precio final: ${productoConImpuesto}`)
    } else if (cupones.some(cupon =>codigoCupon === cupon)) { 
         alert(`
        - Producto: ${nombreProductoSeleccionado}
        - Precio real: ${productoConImpuesto}
        - Precio con descuento: ${productoConImpuesto - (productoConImpuesto * descuento)}`)
    } else {
        alert ("codigo ingresado no valido. Por favor ingrese un codigo valido o precione continuar")
        solicitarCupon(nombreProductoSeleccionado)
    }
}

seleccionarProducto()