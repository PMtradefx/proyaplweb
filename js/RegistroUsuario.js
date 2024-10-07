// Seleccionar el botón de "Registrar nuevo usuario"
const botonRegistro = document.querySelector('.resgistronuevo');

// Agregar evento de clic al botón
botonRegistro.addEventListener('click', () => {
  // Crear ventana modal
  const modal = document.createElement('div');
  modal.style.position = 'fixed';
  modal.style.top = '0';
  modal.style.left = '0';
  modal.style.width = '100%';
  modal.style.height = '100%';
  modal.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
  modal.style.display = 'flex';
  modal.style.justifyContent = 'center';
  modal.style.alignItems = 'center';

  const detalles = document.createElement('div');
  detalles.style.width = '650px';
  detalles.style.height = 'fit-content';
  detalles.style.backgroundColor = '#fff';
  detalles.style.padding = '20px';
  detalles.style.borderRadius = '10px';
  detalles.style.boxShadow = '0 0 10px rgba(0, 0, 0, 0.2)';
  detalles.innerHTML = `
    <div style="display: flex;" class="encabezado">
      <div style="display: flex; justify-content: center; width: 100%;" class="registro">
        <h1>Registrar nuevo usuario</h1>
      </div>
      <div class="cerrar">
        <img style="max-height: 30px; margin-right: 15px;" src="img/cerrar.png" alt="">
      </div>
    </div>
    <div style="font-size:18px; padding-top:20px; text-align:center;" class="datosusuario">
      <p><strong>Cédula: </strong> <input type="text" id="cedula" style="width: 100%; height: 30px; padding: 10px; border: 1px solid #ccc; border-radius: 5px;"></p>
      <p><strong>Nombre: </strong> <input type="text" id="nombre" style="width: 100%; height: 30px; padding: 10px; border: 1px solid #ccc; border-radius: 5px;"></p>
      <p><strong>Correo electrónico: </strong> <input type="email" id="correo" style="width: 100%; height: 30px; padding: 10px; border: 1px solid #ccc; border-radius: 5px;"></p>
      <p><strong>Rol: </strong> 
        <select id="rol" style="width: 100%; height: 40px; padding: 10px; border: 1px solid #ccc; border-radius: 5px;">
          <option value="" selected>Seleccionar rol</option>
          <option value="estudiante">Estudiante</option>
          <option value="profesor">Profesor</option>
          <option value="administrador">Administrador</option>
        </select>
      </p>
      <div id="tutor" style="display: none;">
        <p><strong>Tutor: </strong> 
          <select id="tutor-select" style="width: 100%; height: 30px; padding: 10px; border: 1px solid #ccc; border-radius: 5px;">
            <option value="" selected>Seleccionar tutor</option>
            <option value="Tutor 1">Tutor 1</option>
            <option value="Tutor 2">Tutor 2</option>
            <option value="Tutor 3">Tutor 3</option>
          </select>
        </p>
      </div>
      <div id="fase" style="display: none;">
      <p><strong>Fase: </strong> 
        <select id="fase" style="width: 100%; height: 40px; padding: 10px; border: 1px solid #ccc; border-radius: 5px;">
          <option value="" selected>Seleccionar fase</option>
          <option value="1">Fase de diseño</option>
          <option value="2">Fase de resultados</option>
        </select>
      </p>
      </div>
    </div>
    <div style="text-align: center; margin-top: 20px;">
      <button style="background-color: #f68b30; border: none; color: white; padding: 10px 20px; cursor: pointer; border-radius: 5px;" type="button" class="guardarRegistro">Save</button>
    </div>
  `;

  const cerrar = detalles.querySelector('.cerrar img');
  cerrar.addEventListener('click', () => {
    document.body.removeChild(modal);
  });

  const guardar = detalles.querySelector('.guardarRegistro');
  guardar.addEventListener('click', () => {
    const cedula = detalles.querySelector('#cedula').value;
    const nombre = detalles.querySelector('#nombre').value; 
    const correo = detalles.querySelector('#correo').value; 
    const rol = detalles.querySelector('#rol').value; 
    const tutor = detalles.querySelector('#tutor-select').value; 
    const fase = detalles.querySelector('#fase').value;
    if (cedula == '') {
        alert('Please enter your ID');
      } else if (nombre == '') {
        alert('Please enter your name');
      } else if (correo == '') {
        alert('Please enter your email');
      } else if (rol == '') {
        alert('Please select a role');
      } else if (rol == 'student' && tutor == '') {
        alert('Please select a tutor');
      } else if (rol == 'student' && fase == '') {
        alert('Please select a phase');
      } else {
        const usuario = {
          cedula: cedula,
          nombre: nombre,
          correo: correo,
          rol: rol,
          tutor: tutor,
          fase: fase
        };
      
        const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
        usuarios.push(usuario);
        localStorage.setItem('usuarios', JSON.stringify(usuarios));
        
        const RegistroUsuario = {
            usuarios: []
          };
      
        alert('User  registered successfully');
        document.body.removeChild(modal);
      }

    });

    const rolSelect = detalles.querySelector('#rol');
    rolSelect.addEventListener('change', () => {
    const tutorDiv = detalles.querySelector('#tutor');
    const faseDiv = detalles.querySelector('#fase');
    if (rolSelect.value == 'estudiante') {
        tutorDiv.style.display = 'block';
        faseDiv.style.display = 'block';
    } else {
        tutorDiv.style.display = 'none';
        faseDiv.style.display = 'none';
    }
    });


    const usuarios = RegistroUsuario.usuarios;
    const tablaBody = document.getElementById('tabla-usuarios-body');

    usuarios.forEach((usuario) => {
    const fila = document.createElement('tr');
    fila.innerHTML = `
      <td>${usuario.username}</td>
      <td>${usuario.nombre}</td>
      <td>${usuario.correo}</td>
      <td>${usuario.rol}</td>
      <td>${usuario.tutor}</td>
      <td>${usuario.fase}</td>
      <td>Acciones</td>
    `;
    tablaBody.appendChild(fila);
  });

    modal.appendChild(detalles); document.body.appendChild(modal); 
});