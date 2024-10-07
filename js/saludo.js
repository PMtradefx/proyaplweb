window.addEventListener('load', function() {
    // Obtener el usuario almacenado en localStorage
    const userData = JSON.parse(localStorage.getItem('userData'));
  
    // Verificar si el usuario existe
    if (userData) {
      // Obtener el nombre y apellido del usuario
      const nombre = userData.nombre;
      const apellidos = userData.apellidos;
  
      // Mostrar el nombre y apellido en el Saludo
      const saludo = document.querySelector('.Saludo');
      saludo.innerHTML = `Bienvenido, ${nombre} ${apellidos}`;
    } else {
      // Si no hay usuario almacenado, mostrar un mensaje de error
      alert('No hay usuario almacenado');
    }
  });