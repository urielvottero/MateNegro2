const productos = [{
    img: 'ImgP1.jpg',
    name: 'Tabaquera marron oscuro',
    ribbon: false
},{
    img: 'fotoProducto1 (1).jpg',
    name: 'Tabaquera negra',
    ribbon: false
},{
    img: 'fotoProducto2 (1).jpg',
    name: 'Tabaquera gris',
    ribbon: true
},{
    img: 'fotoProducto3 (1).jpg',
    name: 'Tabaquera beige',
    ribbon: false
},{
    img: 'miniF2.jpg',
    name: 'Mini Marron',
    ribbon: false
},{
    img: 'miniF4.jpg',
    name: 'Mini Negra',
    ribbon: false
},{
    img: 'miniF1.jpg',
    name: 'Mini Gris',
    ribbon: false
},{
    img: 'conBolsilloMa.jpg',
    name: 'Con bolsillo marron',
    ribbon: false
},{
    img: 'conBolsilloNe.jpg',
    name: 'Con bolsillo negro',
    ribbon: true
},{
    img: 'conBolsillogris.jpg',
    name: 'Con bolsillo gris',
    ribbon: true
},{
    img: 'negra1.jpg',
    name: 'Negra de cuero texturado',
    ribbon: false
},{
    img: 'negra2.jpg',
    name: 'Negra de cuero',
    ribbon: false
}]


const contador = $('#contador')
const productoPrincipal = $("#producto-principal")
const listaProductos = $('#lista-productos')
const btnCarrito = $('#btn-carrito')

let cartShopping = localStorage.getItem('cartShopping') || 0
let idProductosSeleccionado = localStorage.getItem('idProductosSeleccionado') || []

if (idProductosSeleccionado.length > 0) {
    idProductosSeleccionado = idProductosSeleccionado.split(',', idProductosSeleccionado.length).map(Number)
}

contador.text(cartShopping)

function limpiarCarrito() {
    idProductosSeleccionado = []
    localStorage.setItem('cartShopping', 0)
    localStorage.setItem('idProductosSeleccionado', [])
    cartShopping = 0
    contador.text(cartShopping)
}

function productoSeleccionado(idProducto) {
    if (idProductosSeleccionado.some(id => id === idProducto)) {
        return false
    }
    cartShopping++
    idProductosSeleccionado.push(idProducto)
    contador.text(cartShopping)
    $.notify(`${productos[idProducto].name} se agrego al carrito!`, "success");
    localStorage.setItem('cartShopping', cartShopping)
    localStorage.setItem('idProductosSeleccionado', idProductosSeleccionado)
}

for ([i, producto] of productos.entries()) {
    let contenedor = document.createElement('div')

    if (!i) {
        contenedor.classList.add('col-12')
        contenedor.innerHTML = `
        <div class="items-mn principal card animate__animated animate__bounce" onClick='productoSeleccionado(${i})'>
        <div class="ribbon">
          <p>Más vendido</p>
          <img src="https://pngimage.net/wp-content/uploads/2018/05/corner-ribbon-png-3.png" alt="..."/>
        </div>
        <img src="../img/${producto.img}" class="d-block img-fluid" alt="imagen producto">
        <div class="producto-text card-body mi-card-body">
          <p class="card-text">${producto.name}</p>
          <div class="d-flex">
              <button type="button" class="btn btn-sm bg-light">Hace tu pedido</button>
          </div>
        </div>
      </div>`
        productoPrincipal.append(contenedor)
    } else {
        contenedor.classList.add('col')
        contenedor.innerHTML = `
        <div class="items-mn card" onClick='productoSeleccionado(${i})'>
        ${producto.ribbon ? `<div class="ribbon">
        <p>Más vendido</p>
        <img src="https://pngimage.net/wp-content/uploads/2018/05/corner-ribbon-png-3.png" alt="..."/>
        </div>`:''}
        <img src="../img/${producto.img}" class="d-block img-fluid" alt="imagen producto">
        <div class="producto-text card-body mi-card-body">
            <p class="card-text">${producto.name}</p>
        </div>
        </div>`
        
    listaProductos.append(contenedor)
    }
}

let listaProductosCarrito = () => {
    result = idProductosSeleccionado.map( (id, i) => {
        return `<li>
            <span class="material-icons" onClick="borrarItem(${id})">delete_sweep</span> 
            ${productos[id].name}
        </li>`
    }).toString().replace(/,/g,'')

    return result
}

function borrarItem(id) {
    const index = idProductosSeleccionado.indexOf(id)
    if (index > -1) {
        idProductosSeleccionado.splice(index, 1);
        cartShopping--
        contador.text(cartShopping)
        $.notify(`Se liminó ${productos[id].name} del carrito!`, "error");
        localStorage.setItem('cartShopping', cartShopping)
        localStorage.setItem('idProductosSeleccionado', idProductosSeleccionado)
        Swal.close()
    }
}

function mostrarCarrito() {
    if(idProductosSeleccionado.length === 0) return false
    Swal.fire({
        title: 'Carrito de compras',
        html:`<ul class="lista-productos-seleccionados">${listaProductosCarrito()}</ul>`,
        showCloseButton: true,
        showCancelButton: true,
        focusConfirm: false,
        confirmButtonText:'Finalizar compra',
        confirmButtonAriaLabel: 'Confirmar compra y contactar un vendedor.',
        cancelButtonText:'Salir',
        cancelButtonAriaLabel: 'Salir del carrito'
      }).then((result) => {
        if (result.isConfirmed) {
          alert('confirmo')
        }
      })
}

/*
<div class="col-12">
                
              </div>
*/