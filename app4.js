const productos = [{
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


const contador = document.getElementById('contador')
const listaProductos = document.getElementById('lista-productos')

let idProductosSeleccionado = []
let cartShopping = localStorage.getItem('cartShopping') || 0

contador.innerText = cartShopping

function limpiarCarrito() {
    idProductosSeleccionado = []
    localStorage.setItem('cartShopping', '0')
    cartShopping = 0
    contador.innerText = cartShopping
}

function productoSeleccionado(idProducto) {
    if (idProductosSeleccionado.some(id => id === idProducto)) {
        return false
    }
    cartShopping++
    idProductosSeleccionado.push(idProducto)
    contador.innerText = cartShopping
    localStorage.setItem('cartShopping', cartShopping)
}

for ([i, producto] of productos.entries()) {
    let contenedor = document.createElement('div')
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
    
  listaProductos.appendChild(contenedor)
}