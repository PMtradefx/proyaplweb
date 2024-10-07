let users = JSON.parse(localStorage.getItem('usuarios')) || [];

// Función para eliminar un usuario del arreglo users
async function deleteUserFromUsers(userId) {
  const userIndex = users.findIndex((user) => user.id === userId);
  if (userIndex !== -1) {
    users.splice(userIndex, 1);
    localStorage.setItem('usuarios', JSON.stringify(users));
    return true;
  } else {
    return false;
  }
}
const faseElement = document.getElementById('update-fase');
console.log('Elemento fase:', faseElement); // Depuración
const fase = faseElement ? faseElement.value : '';
console.log('Valor de fase capturado:', fase);


// Función para actualizar la tabla de usuarios
function updateTable() {
  const tbody = document.getElementById('tabla-usuarios-body');
  if (tbody) {
    tbody.innerHTML = '';
    users.forEach((user) => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${user.cedula}</td>
        <td>${user.nombre}</td>
        <td>${user.correo}</td>
        <td>${user.rol}</td>
        <td>${user.tutor}</td>
        <td>${user.fase}</td>
        <td>
          <button class="btn btn-primary" onclick='editUser(${JSON.stringify(user)})'>
            <i class="bi bi-pencil"></i>
          </button>
          <button class="btn btn-danger" onclick='deleteUser(${user.id})'>
            <i class="bi bi-trash"></i>
          </button>
        </td>
      `;
      tbody.appendChild(row);
    });
  } else {
    console.error('El elemento tabla-usuarios-body no existe');
  }
}

// Cargar la tabla de usuarios al cargar la página
document.addEventListener('DOMContentLoaded', () => {
  updateTable();
});

// Función para crear un nuevo usuario
async function createUser(cedula, nombre, correo, rol, tutor, fase) {
  const newUser = {
    id: users.length + 1,
    cedula,
    nombre,
    correo,
    rol,
    tutor,
    fase
  };
  users.push(newUser);
  localStorage.setItem('usuarios', JSON.stringify(users));
  return true;
}

// Función para leer todos los usuarios
function readUsers() {
  return users;
}

// Función para actualizar un usuario


function updateUser() {
    const userId = parseInt(document.getElementById('update-user-id').value);
  const cedula = document.getElementById('update-cedula').value;
  const nombre = document.getElementById('update-nombre').value;
  const correo = document.getElementById('update-correo').value;
  const rol = document.getElementById('update-rol').value;
  const tutor = document.getElementById('update-tutor-select').value;
  const fase = document.getElementById('update-fase').value;
    if (!validarFormulario(cedula, nombre, correo, rol, tutor, fase)) {
      return;
    }
  
    // Actualizar usuario
    updateUserFromUsers(userId, { cedula, nombre, correo, rol, tutor, fase });
  
    // Cerrar el modal y actualizar la tabla
    closeUpdateModal();
    updateTable();
  }
  

  
  

// Función para actualizar datos del usuario en el array y localStorage
function updateUserFromUsers(userId, updates) {
  const userIndex = users.findIndex((user) => user.id === userId);
  if (userIndex !== -1) {
    users[userIndex] = { ...users[userIndex], ...updates, id: userId };
    localStorage.setItem('usuarios', JSON.stringify(users));
  }

  // Actualizar la tabla de usuarios
  updateTable();

  // Cerrar diálogo modal
  document.getElementById('update-modal').style.display = "none";
}

// Función para abrir el diálogo modal
function openModal() {
    document.getElementById('modal').style.display = "block";
    document.getElementById('modal-title').innerHTML = 'Registrar nuevo usuario';
    document.getElementById('cedula').value = '';
    document.getElementById('nombre').value = '';
    document.getElementById('correo').value = '';
    document.getElementById('rol').value = '';
    document.getElementById('tutor-select').value = '';
    document.getElementById('fase').value = '';
    document.getElementById('tutor').style.display = 'none';
    document.getElementById('fase').style.display = 'none';
    document.getElementById('edit-user-id').value = null;
  }
  
  // Función para abrir el diálogo modal de actualización
  function openUpdateModal(user) {
    document.getElementById('update-modal').style.display = "block";
    document.getElementById('update-modal-title').innerHTML = 'Actualizar datos';
    document.getElementById('update-cedula').value = user.cedula;
    document.getElementById('update-nombre').value = user.nombre;
    document.getElementById('update-correo').value = user.correo;
    document.getElementById('update-rol').value = user.rol;
    document.getElementById('update-tutor-select').value = user.tutor;
    document.getElementById('update-fase').value = user.fase;
    document.getElementById('update-user-id').value = user.id;
  }
  

  
  document.getElementById('rol').addEventListener('change', function() {
    if (this.value === 'estudiante') {
      document.getElementById('tutor').style.display = 'block';
      document.getElementById('fasediv').style.display = 'block';
      document.getElementById('fase').style.display = 'block'; // Agregar este código
    } else {
      document.getElementById('tutor').style.display = 'none';
      document.getElementById('fasediv').style.display = 'none';
      document.getElementById('fase').style.display = 'none'; // Agregar este código
    }
  });

document.getElementById('update-rol').addEventListener('change', function() {
    if (this.value === 'estudiante') {
      document.getElementById('update-tutor').style.display = 'block';
      document.getElementById('update-fasediv').style.display = 'block';
    } else {
      document.getElementById('update-tutor').style.display = 'none';
      document.getElementById('update-fasediv').style.display = 'none';
    }
  });
  

// Función para editar un usuario
function editUser(user) {
  openUpdateModal(user);
}

// Función para asignar un tutor a un usuario
async function assignTutor(userId, tutorId) {
  const userIndex = users.findIndex((user) => user.id === userId);
  if (userIndex !== -1) {
    users[userIndex].tutorId = tutorId;
    localStorage.setItem('usuarios', JSON.stringify(users));
    return true;
  } else {
    return false;
  }
}

// Validaciones
// Función para validar cédula
function validarCedula(cedula) {
    const regex = /^\d{10}$/;
    return regex.test(cedula);
  }
  
  // Función para validar nombre
  function validarNombre(nombre) {
    const regex = /^[A-Za-z\s]+$/;
    return regex.test(nombre);
  }
  
  // Función para validar correo electrónico
  function validarEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }
  
  // Función para validar el rol
  function validarRol(rol) {
    return rol !== '';
  }
  
  // Función para validar campos adicionales si el rol es estudiante
  function validarEstudiante(rol, tutor, fase) {
    if (rol === 'estudiante') {
      if (tutor === '') {
        alert('Por favor, selecciona un tutor para el estudiante.');
        return false;
      }
      if (fase === '') {
        alert('Por favor, selecciona una fase para el estudiante.');
        return false;
      }
    }
    return true;
  }
  
  // Función para validar todo el formulario
  function validarFormulario(cedula, nombre, correo, rol, tutor, fase) {
    if (!validarCedula(cedula)) {
      alert('Cédula no válida. Debe contener 10 dígitos.');
      return false;
    }
  
    if (!validarNombre(nombre)) {
      alert('Nombre no válido. Solo se permiten letras y espacios.');
      return false;
    }
  
    if (!validarEmail(correo)) {
      alert('Correo no válido. Por favor, ingresa un correo electrónico válido.');
      return false;
    }
  
    if (!validarRol(rol)) {
      alert('Por favor, selecciona un rol.');
      return false;
    }
  
    if (!validarEstudiante(rol, tutor, fase)) {
      return false;
    }
  
    return true;
  }
  
  
function saveUser() {
    const cedula = document.getElementById('cedula').value;
    const nombre = document.getElementById('nombre').value;
    const correo = document.getElementById('correo').value;
    const rol = document.getElementById('rol').value;
    const tutor = document.getElementById('tutor-select').value;
    const fase = document.getElementById('fase').value;
    const userId = document.getElementById('edit-user-id').value;
  
    // Validar los campos como ya lo haces
    if (!validarFormulario(cedula, nombre, correo, rol, tutor, fase)) {
      return;
    }
  
    if (userId) {
      // Actualizar usuario
      updateUserFromUsers(parseInt(userId), { cedula, nombre, correo, rol, tutor, fase });
    } else {
      // Crear nuevo usuario
      createUser(cedula, nombre, correo, rol, tutor, fase);
    }
  
    // Actualizar tabla y cerrar modal
    updateTable();
    closeModal();
  }
  



// Función para eliminar un usuario
function deleteUser(userId) {
if (confirm('¿Estás seguro de que deseas eliminar este usuario?')) {
deleteUserFromUsers(parseInt(userId));
updateTable();
}
}

// Función para cerrar el modal
function closeModal() {
document.getElementById('modal').style.display = "none";
}

// Función para cerrar el modal de actualización
function closeUpdateModal() {
document.getElementById('update-modal').style.display = "none";
}

