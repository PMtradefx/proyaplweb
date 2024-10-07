// Obtener el img de logout
const logoutImg = document.querySelector('.logout img');

// Agregar evento de clic al img de logout
logoutImg.addEventListener('click', function() {
  // Mostrar mensaje de confirmación
  if (confirm('¿Estás seguro de que deseas cerrar sesión?')) {
    // Cerrar sesión
    localStorage.removeItem('userData');

    // Redirigir al usuario a la página de login
    window.location.href = 'login.html';
  }
});