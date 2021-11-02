const productos = $.ajax({
    type: 'GET',
    crossDomain: true,
    async: false,
    dataType: 'json',
    url: 'http://127.0.0.1:3000/productos',
    success: result => {
        return result
    }
 }).responseJSON

 function enviarPedido(data) {
     console.log(data)
    $.ajax({
        type: 'POST',
        crossDomain: true,
        data: data,
        url: 'http://127.0.0.1:3000/pedidos',
        success: result => {
            Swal.fire({
                icon: 'success',
                title: 'Genial!',
                text: 'Gracias, nos comunicaremos en breve.'
              })
        }
     })
 }
 

const contador = $('#contador')
const productoPrincipal = $("#producto-principal")
const listaProductos = $('#lista-productos')
const btnCarrito = $('#btn-carrito')

let cartShopping = localStorage.getItem('cartShopping') || 0
let idProductosSeleccionado = localStorage.getItem('idProductosSeleccionado') || []
let totalCompra = 0

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
    totalCompra = 0
    result = idProductosSeleccionado.map( (id, i) => {
        totalCompra = productos[id].price + totalCompra
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
        html:`
        <ul class="lista-productos-seleccionados">
            ${listaProductosCarrito()}
        </ul>
        <b>Total: ${totalCompra}</b>
        `,
        showCloseButton: true,
        showCancelButton: true,
        focusConfirm: false,
        confirmButtonText:'Finalizar compra',
        confirmButtonAriaLabel: 'Confirmar compra y contactar un vendedor.',
        cancelButtonText:'Salir',
        cancelButtonAriaLabel: 'Salir del carrito'
      }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire({
                html:`
                    <form class="p-4 pb-0">
                        <div class="mb-3">
                            <label for="exampleFormControlInput1" class="form-label">Email</label>
                            <input type="email" class="form-control" id="formEmail" placeholder="name@example.com" required>
                        </div>
                        <div class="mb-3">
                            <label for="exampleFormControlTextarea1" class="form-label">Tenés alguna consultas?</label>
                            <textarea class="form-control" id="formConsulta" rows="4"></textarea>
                        </div>
                    </form>
                `,
                showCloseButton: true,
                showCancelButton: true,
                focusConfirm: false,
                confirmButtonText:'Listo',
                confirmButtonAriaLabel: 'Enviar formulario de consulta',
                cancelButtonText:'Cancelar',
                cancelButtonAriaLabel: 'Cancelar'
              }).then((result) => {
                  if (result.isConfirmed) {
                    let email = $('#formEmail').val()
                    let consulta = $('#formConsulta').val()
                    enviarPedido({email, consulta})
                  }
              })
        }
      })
}

