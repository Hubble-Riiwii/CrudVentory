// CONFIG
const API_URL = 'http://localhost:3000';

// SERVICES
const getDashboard = async () => {
  const res = await fetch(`${API_URL}/dashboard`);
  return res.json();
};

// USERS
const getUsers = async () => {
  const res = await fetch(`${API_URL}/users`);
  return res.json();
};


const createUser = async (user) => {
  return fetch(`${API_URL}/users`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(user)
  });
};

const updateUser = async (id, user) => {
  return fetch(`${API_URL}/users/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(user)
  });
};

const deleteUser = async (id) => {
  return fetch(`${API_URL}/users/${id}`, { method: 'DELETE' });
};

// PRODUCTS
const getProduct = async () => {
  const res = await fetch(`${API_URL}/products`);
  return res.json();
};
const createProduct = async (user) => {
  return fetch(`${API_URL}/products`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(user)
  });
};

const updateProduct = async (id, products) => {
  return fetch(`${API_URL}/products/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(products)
  });
};

const deleteProduct = async (id) => {
  return fetch(`${API_URL}/products/${id}`, { method: 'DELETE' });
};

// UI HELPERS
const roleBadge = (role) =>
  role === 'admin' ? 'bg-danger' :
    role === 'user' ? 'bg-success' : 'bg-secondary';


// RENDERS
const renderStats = (stats) => `
  <div class="row g-3 mb-4">
    <div class="col-md-3">
      <div class="card text-bg-primary">
        <div class="card-body text-center">
          <h6>Usuarios</h6>
          <h3>${stats.total_users}</h3>
        </div>
      </div>
    </div>
    <div class="col-md-3">
      <div class="card text-bg-success">
        <div class="card-body text-center">
          <h6>Ventas</h6>
          <h3>${stats.total_sales}</h3>
        </div>
      </div>
    </div>
    <div class="col-md-3">
      <div class="card text-bg-warning">
        <div class="card-body text-center">
          <h6>Ingresos</h6>
          <h3>$${stats.total_revenue}</h3>
        </div>
      </div>
    </div>
    <div class="col-md-3">
      <div class="card text-bg-danger">
        <div class="card-body text-center">
          <h6>Productos</h6>
          <h3>${stats.total_products}</h3>
        </div>
      </div>
    </div>
  </div>
`;

const renderDashboardUsers = (users) => `
  <div class="card">
    <div class="card-header">Últimos usuarios</div>
    <div class="card-body">
      <table class="table table-hover">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Email</th>
            <th>Rol</th>
          </tr>
        </thead>
        <tbody>
          ${users.map(u => `
            <tr>
              <td>${u.name}</td>
              <td>${u.email}</td>
              <td><span class="badge ${roleBadge(u.role)}">${u.role}</span></td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    </div>
  </div>
`;

const renderUsersCRUD = (users) => `
  <button class="btn btn-primary mb-3" onclick="openUserForm()">Nuevo Usuario</button>

  <table class="table table-striped">
    <thead>
      <tr>
        <th>Nombre</th>
        <th>Email</th>
        <th>Rol</th>
        <th class="text-end">Acciones</th>
      </tr>
    </thead>
    <tbody>
      ${users.map(u => `
        <tr>
          <td>${u.name}</td>
          <td>${u.email}</td>
          <td>${u.role}</td>
          <td class="text-end">
            <button class="btn btn-sm btn-warning me-1" onclick="editUser('${u.id}')">Editar</button>
            <button class="btn btn-sm btn-danger" onclick="removeUser('${u.id}')">Eliminar</button>
          </td>
        </tr>
      `).join('')}
    </tbody>
  </table>
`;

const renderUserForm = (user = {}) => `
  <div class="card mb-3">
    <div class="card-body">
      <h5>${user.id ? 'Editar Usuario' : 'Nuevo Usuario'}</h5>
      <form id="userForm">
        <input type="hidden" id="userId" value="${user.id || ''}">
        <input class="form-control mb-2" id="username" placeholder="Nombre" value="${user.name || ''}" required>
        <input class="form-control mb-2" id="email" placeholder="Email" value="${user.email || ''}" required>
        <input class="form-control mb-2" id="password" placeholder="Password" value="${user.password || ''}" required>
        <select class="form-select mb-2" id="role">
          <option value="admin" ${user.role === 'admin' ? 'selected' : ''}>Admin</option>
          <option value="user" ${user.role === 'user' ? 'selected' : ''}>User</option>
        </select>
        <button class="btn btn-success">Guardar</button>
        <button type="button" class="btn btn-secondary ms-2" onclick="loadUsersCrud()">Cancelar</button>
      </form>
    </div>
  </div>
`;


// PRODUCTS
// UI HELPERS
// const CatBadge = (category) =>
//   role === '1' ? 'Maquinaria y Equipos' :
//   role === '2' ? 'Pintura y Acabados' : '';
//   role === '3' ? 'Herramientas de Mano' : '';
//   role === '4' ? 'Plomería y Gas' : '';

// const StateBadge = (state) =>
//   role === '1' ? 'Publicado' :
//   role === '2' ? 'Borrador' : '';
//   role === '3' ? 'Agotado' : '';

const renderDashboardProducts = (products) => `
  <div class="card">
    <div class="card-header">Últimos Productos</div>
    <div class="card-body">
      <table class="table table-hover">
        <thead>
          <tr>
            <th>Id</th>
            <th>Nombre</th>
            <th>Categoria</th>
            <th>Precio</th>
            <th>Stock</th>
            <th>Descripción</th>
            <th>Estado</th>
          </tr>
        </thead>
        <tbody>
          ${products.map(p => `
            <tr>
              <td>${p.id}</td>
              <td>${p.name}</td>
              <td><span class="">${p.category_id}</span></td>
              <td>${p.price}</td>
              <td>${p.stock}</td>
              <td>${p.description}</td>
              <td><span class="">${p.product_state}</span></td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    </div>
  </div>
`;

const renderProductCRUD = (products) => `
  <button class="btn btn-primary mb-3" onclick="openProductForm()">Nuevo Producto</button>

  <table class="table table-striped">
    <thead>
      <tr>
            <th>Id</th>
            <th>Nombre</th>
            <th>Categoria</th>
            <th>Precio</th>
            <th>Stock</th>
            <th>Descripción</th>
            <th>Estado</th>
        <th class="text-end">Acciones</th>
      </tr>
    </thead>
    <tbody>
      ${products.map(p => `
        <tr>
              <td>${p.id}</td>
              <td>${p.name}</td>
              <td><span class="">${p.category_id}</span></td>
              <td>${p.price}</td>
              <td>${p.stock}</td>
              <td>${p.description}</td>
              <td>${p.product_state}</td>
          <td class="text-end">
            <button class="btn btn-sm btn-warning me-1" onclick="editProduct('${p.id}')">Editar</button>
            <button class="btn btn-sm btn-danger" onclick="removeProduct('${p.id}')">Eliminar</button>
          </td>
        </tr>
      `).join('')}
    </tbody>
  </table>
`;

const renderProductForm = (product = {}) => `
  <div class="card mb-3">
    <div class="card-body">
      <h5>${product.id ? 'Editar Producto' : 'Nuevo Producto'}</h5>
      <form id="productForm">
        <input type="hidden" id="productId" value="${product.id || ''}">
        <input class="form-control mb-2" id="productname" placeholder="Nombre" value="${product.name || ''}" required>
        
        <select class="form-select mb-2" id="category_id">
        <option value="1" ${product.category_id === 'Maquinaria y Equipos' ? 'selected' : ''}>Maquinaria y Equipos</option>
        <option value="2" ${product.category_id === 'Pintura y Acabados' ? 'selected' : ''}>Pintura y Acabados</option>
        <option value="3" ${product.category_id === 'Herramientas de Mano' ? 'selected' : ''}>Herramientas de Mano</option>
        <option value="4" ${product.category_id === 'Plomería y Gas' ? 'selected' : ''}>Plomería y Gas</option>
        </select>
        <input class="form-control mb-2" id="price" placeholder="price" value="${product.price || ''}" required>
        <input class="form-control mb-2" id="stock" placeholder="stock" value="${product.stock || ''}" required>
        <input class="form-control mb-2" id="description" placeholder="descripción" value="${product.description || ''}" required>

        <button class="btn btn-success">Guardar</button>
        <button type="button" class="btn btn-secondary ms-2" onclick="loadProductCrud()">Cancelar</button>
      </form>
    </div>
  </div>
`;

// PAGES
const loadDashboard = async () => {
  const main = document.querySelector('.main');
  main.innerHTML = '<h2 class="mb-4">Dashboard</h2>';

  const dashboard = await getDashboard();
  const users = await getUsers();

  main.innerHTML += renderStats(dashboard.stats);
  main.innerHTML += renderDashboardUsers(users);
};

const loadUsersCrud = async () => {
  const main = document.querySelector('.main');
  const users = await getUsers();

  main.innerHTML = '<h2 class="mb-4">Administrar Usuarios</h2>';
  main.innerHTML += renderUsersCRUD(users);
};

const loadProductCrud = async () => {
  const main = document.querySelector('.main');
  const product = await getProduct();

  main.innerHTML = '<h2 class="mb-4">Administrar Productos</h2>';
  main.innerHTML += renderProductCRUD(product);
};

// CRUD LOGIC USER
const openUserForm = () => {
  document.querySelector('.main')
    .insertAdjacentHTML('afterbegin', renderUserForm());
};

const editUser = async (id) => {
  const users = await getUsers();
  const user = users.find(u => u.id == id);
  document.querySelector('.main')
    .insertAdjacentHTML('afterbegin', renderUserForm(user));

};

const removeUser = async (id) => {
  if (!confirm('¿Eliminar usuario?')) return;
  await deleteUser(id);
  loadUsersCrud();
};

document.addEventListener('submit', async (e) => {
  if (e.target.id !== 'userForm') return;
  e.preventDefault();

  const id = document.getElementById('userId').value;
  const user = {
    name: username.value,
    email: email.value,
    password: password.value,
    role: role.value
  };

  id ? await updateUser(id, user) : await createUser(user);
  loadUsersCrud();
});

// CRUD PRODUCT
const openProductForm = () => {
  document.querySelector('.main')
    .insertAdjacentHTML('afterbegin', renderProductForm());
};
const editProduct = async (id) => {
  const products = await getProduct();
  const product = products.find(u => u.id == id);
  document.querySelector('.main')
    .insertAdjacentHTML('afterbegin', renderProductForm(product));

};

const removeProduct = async (id) => {
  if (!confirm('¿Eliminar Producto?')) return;
  await deleteProduct(id);
  loadProductCrud();
};
  document.addEventListener('submit', async (e) => {
    if (e.target.id !== 'productForm') return;
    e.preventDefault();

    const id = document.getElementById('productId').value;
    const product = {
      id: id.value,
      productname: productname.value,
      category_id: category_id.value,
      price: price.value,
      stock: stock.value,
      description: description.value
    };

    id ? await updateProduct(id, product) : await createProduct(product);
    loadProductCrud();
  });

// NAVIGATION
document.querySelector('.dashborad').addEventListener('click', loadDashboard);
document.querySelector('.manage-users').addEventListener('click', loadUsersCrud);
document.querySelector('.manage-products').addEventListener('click', loadProductCrud);
document.querySelector('.Landing-page').addEventListener('click', () => {
  window.location = '../index.html';
});


// INIT
document.addEventListener('DOMContentLoaded', loadDashboard);
