// Inicialización
const adminCredentials = [
    { username: 'admin1', password: 'password1' },
    { username: 'admin2', password: 'password2' }
];

let productos = [];
let carrito = [];

// Cargar productos en oferta
function cargarProductosEnOferta() {
    const productosEnOferta = [
        { nombre: 'Regalo 1', precio: 25.00, imagen: 'https://via.placeholder.com/150', categoria: 'ofertas' },
        { nombre: 'Regalo 2', precio: 30.00, imagen: 'https://via.placeholder.com/150', categoria: 'aniversario' },
        { nombre: 'Regalo 3', precio: 15.00, imagen: 'https://via.placeholder.com/150', categoria: 'cumpleanos' },
        { nombre: 'Regalo 4', precio: 40.00, imagen: 'https://via.placeholder.com/150', categoria: 'boda' },
        { nombre: 'Regalo 5', precio: 20.00, imagen: 'https://via.placeholder.com/150', categoria: 'navidad' }
    ];

    const featuredProductsList = document.getElementById('featured-products-list');
    featuredProductsList.innerHTML = ''; // Limpiar lista anterior

    productosEnOferta.forEach(producto => {
        const productoHTML = `
            <div class="product">
                <img src="${producto.imagen}" alt="${producto.nombre}">
                <h3>${producto.nombre}</h3>
                <p>Precio: $${producto.precio.toFixed(2)}</p>
                <button onclick="agregarAlCarrito('${producto.nombre}', ${producto.precio})" class="button">
                    <i class="fas fa-shopping-cart"></i> Agregar al Carrito
                </button>
            </div>
        `;
        featuredProductsList.innerHTML += productoHTML;
        productos.push(producto); // Agregar el producto al array
    });
}

// Mostrar sección de productos por categoría
function mostrarSeccion(categoria) {
    const secciones = document.querySelectorAll('.seccion');
    secciones.forEach(seccion => {
        seccion.style.display = 'none'; // Ocultar todas las secciones
    });

    const categoriaSeccion = document.getElementById(categoria);
    categoriaSeccion.style.display = 'block'; // Mostrar la sección de la categoría seleccionada

    // Limpiar lista de productos de la categoría seleccionada
    const categoriaProductos = document.getElementById(`${categoria}-products`);
    categoriaProductos.innerHTML = '';

    // Filtrar y mostrar productos de la categoría
    productos.forEach(producto => {
        if (producto.categoria === categoria) {
            const productoHTML = `
                <div class="product">
                    <img src="${producto.imagen}" alt="${producto.nombre}">
                    <h3>${producto.nombre}</h3>
                    <p>Precio: $${producto.precio.toFixed(2)}</p>
                    <button onclick="agregarAlCarrito('${producto.nombre}', ${producto.precio})" class="button">
                        <i class="fas fa-shopping-cart"></i> Agregar al Carrito
                    </button>
                </div>
            `;
            categoriaProductos.innerHTML += productoHTML;
        }
    });
}

// Mostrar el carrito
function mostrarCarrito() {
    document.getElementById('cart-section').style.display = 'block';
    document.getElementById('login-modal').style.display = 'none'; // Cerrar el modal de login si está abierto
}

// Agregar producto al carrito
function agregarAlCarrito(nombre, precio) {
    carrito.push({ nombre, precio });
    actualizarCarrito();
}

// Actualizar el carrito
function actualizarCarrito() {
    const cartItems = document.getElementById('cart-items');
    cartItems.innerHTML = '';
    
    let total = 0;
    
    carrito.forEach(item => {
        const itemHTML = `<p>${item.nombre} - $${item.precio.toFixed(2)}</p>`;
        cartItems.innerHTML += itemHTML;
        total += item.precio;
    });
    
    document.getElementById('total-price').textContent = total.toFixed(2);
    document.getElementById('cart-count').textContent = carrito.length;
}

// Función para pagar
function pagar() {
    const paymentLink = "https://www.mercadopago.com.ar"; // Enlace de Mercado Pago
    alert('Redirigiendo a Mercado Pago para realizar el pago.');
    window.open(paymentLink, '_blank');
    
    // Vaciar carrito después del pago
    carrito = [];
    actualizarCarrito();
    document.getElementById('cart-section').style.display = 'none';
}

// Mostrar y cerrar el modal de inicio de sesión
function mostrarModal() {
    document.getElementById('login-modal').style.display = 'block';
}

function cerrarModal() {
    document.getElementById('login-modal').style.display = 'none';
}

// Mostrar y cerrar el modal para crear cuenta
function mostrarCrearCuenta() {
    document.getElementById('login-modal').style.display = 'none';
    document.getElementById('create-account-modal').style.display = 'block';
}

function cerrarCrearCuentaModal() {
    document.getElementById('create-account-modal').style.display = 'none';
    document.getElementById('login-modal').style.display = 'block'; // Volver a mostrar el modal de inicio de sesión
}

// Manejar el inicio de sesión
const loginForm = document.getElementById('login-form');
loginForm.addEventListener('submit', function (e) {
    e.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    const admin = adminCredentials.find(admin => admin.username === username && admin.password === password);
    
    if (admin) {
        // Mostrar botón de administrador y sección de productos
        document.getElementById('admin-btn').style.display = 'block';
        mostrarSeccion('ofertas'); // Cargar la sección de ofertas
        cargarProductosEnOferta(); // Cargar productos en oferta al iniciar sesión
        cerrarModal(); // Cerrar el modal
    } else {
        document.getElementById('login-error').style.display = 'block';
    }
});

// Crear cuenta
const createAccountForm = document.getElementById('create-account-form');
createAccountForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const newUsername = document.getElementById('new-username').value;
    const email = document.getElementById('email').value;
    const newPassword = document.getElementById('new-password').value;
    const confirmPassword = document.getElementById('confirm-password').value;

    if (newPassword !== confirmPassword) {
        document.getElementById('create-account-error').style.display = 'block';
        return;
    }

    alert('Cuenta creada con éxito (simulación).');
    cerrarCrearCuentaModal(); // Cerrar el modal de crear cuenta
});

// Mostrar/ocultar categorías
function toggleCategorias() {
    const categorias = document.getElementById('categories');
    categorias.style.display = categorias.style.display === 'none' ? 'block' : 'none';
}

// Cargar productos en oferta al cargar la página
window.onload = () => {
    cargarProductosEnOferta();
};
