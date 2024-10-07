// Seleccionar el botón de "Tutoría Nueva"
const botonTutoriaNueva = document.querySelector('.tutorianueva');
const tutorias = [
    {profesor: 'Ing. Patricia Quiroz' },
  ];


// Agregar evento de clic al botón
botonTutoriaNueva.addEventListener('click', () => {
    // consulta sobre tutorias
    tutorias.forEach(tutoria => {
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
  detalles.style.height = 'fot-content';
  detalles.style.backgroundColor = '#fff';
  detalles.style.padding = '20px';
  detalles.style.borderRadius = '10px';
  detalles.style.boxShadow = '0 0 10px rgba(0, 0, 0, 0.2)';
  detalles.innerHTML = `
    <div style="display: flex;" class="encabezado">
        <div style=" display: flex;justify-content: center; width: 100%;" class="tutoriaa">
            <h1>Solicitar una nueva tutoria</h1>
        </div>
        <div class="cerrar">
            <img style="max-height: 30px; margin-right: 15px;" src="img/cerrar.png" alt="">
        </div>
        </div>
        <div style="font-size:30px; padding-top:20px;" class="datostutoria">
        <p><strong>Tutor: </strong> ${tutoria.profesor}</p>
    </div>
       <div class="datostutorianueva" style="font-size: 18px; padding-top: 20px; display: flex; justify-content: space-between;">
        <div class ="fechatutorianueva">
        <p><strong>Fecha: </strong> <input type="date" id="fecha" style="width: 100%; height: 30px; padding: 10px; border: 1px solid #ccc; border-radius: 5px; "></p>
        </div>
        <div class="horatutorianueva">
         <p><strong>Hora: </strong> <input type="time" id="hora" style="width: 100%; height: 30px; padding: 10px; border: 1px solid #ccc; border-radius: 5px;"></p>
        </div>
    </div>
    <button style="background-color: #f68b30; border: none; color: white; padding: 10px 20px; cursor: pointer; border-radius: 5px; margin-top: 10px; display: block; margin-left: auto; margin-right: auto;" type="button" class="guardarTutoria">Guardar</button>
  `;

  const cerrar = detalles.querySelector('.cerrar img');
  cerrar.addEventListener('click', () => {
    document.body.removeChild(modal);
  });

  const guardar = detalles.querySelector('.guardarTutoria');
  guardar.addEventListener('click', () => {
    const fecha = detalles.querySelector('#fecha').value;
    const hora = detalles.querySelector('#hora').value;
    if (fecha == '') {
        alert('Por favor, selecciona una fecha');
    } else if (hora == '') {
        alert('Por favor, selecciona una hora');
    } else {
        const horaSeleccionada = detalles.querySelector('#hora').value;
        alert('Fecha seleccionada: ' + fecha + ' - Hora seleccionada: ' + hora);
        document.body.removeChild(modal);
    }
    });

  modal.appendChild(detalles);

  document.body.appendChild(modal);
})
});