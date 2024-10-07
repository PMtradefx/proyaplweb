
const form = document.querySelector('.login');
const usernameInput = document.querySelector('input[name="usuario"]');
const passwordInput = document.querySelector('input[name="password"]');
const submitButton = document.querySelector('.botonlogin');

submitButton.addEventListener('click', (e) => {
  e.preventDefault();

  const username = usernameInput.value.trim();
  const password = passwordInput.value.trim();

  if (username && password) {

    const userData = authenticateUser (username, password);

    if (userData) {
      localStorage.setItem('userData', JSON.stringify(userData));

      const role = userData.rol;
      if (role === 'Admin') {
        window.location.href = 'dashadm.html';
      } else if (role === 'Estudiante') {
        window.location.href = 'dashStu.html';
      } else if (role =='Profesor') {
        window.location.href = 'dashPro.html';
      } else {
        alert('Rol invalido');
      }
    } else {
      alert('Usuario o contraseña incorrecto');
    }
  } else {
    alert('Ingrese usuario y contraseña');
  }
});


function authenticateUser (username, password) {
  const users = [
    { usuario: "e9999999999", password: 'Uleam2024' ,nombre: "Estudiante", apellidos: "Uleam", rol: "Estudiante", correo: "e9999999999@live.uleam.edu.ec" },
    { usuario: "p9999999999", password: 'Uleam2024' ,nombre: "Profesor", apellidos: "Uleam", rol: "Profesor", correo: "p9999999999@uleam.edu.ec" },
    { usuario: "a9999999999", password: 'Uleam2024' ,nombre: "Administrador", apellidos: "Uleam", rol: "Admin", correo: "a9999999999@uleam.edu.ec" }
  ];

  for (const user of users) {
    if (user.usuario === username && user.password === password) {
      return user;
    }
  }

  return null;
}