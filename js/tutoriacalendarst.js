
window.addEventListener("load", function () {
    // Obtener la tabla y las filas
    const table = document.querySelector('table');
    const rows = table.querySelectorAll('tbody tr');

    // Obtener los datos de las tutorías
    const tutorias = [
      { dia: 'Lunes', hora: '10:00', duracion: 2 , fase: 1 , salon: 'Sala de profesores tiempo completo' , profesor: 'Ing. Patricia Quiroz' },
      { dia: 'Viernes', hora: '12:00', duracion: 1 , fase: 1 ,salon: 'Sala de profesores tiempo completo'  , profesor: 'Ing. Patricia Quiroz' },
      // Agrega más tutorías aquí
    ];
  
    // Iterar sobre las tutorías
    tutorias.forEach(tutoria => {
      // Obtener la fila y columna correspondientes a la tutoría
      const rowIndex = getHourIndex(tutoria.hora);
      if (rowIndex !== -1) {
        const row = rows[rowIndex];
        const colIndex = getDayIndex(tutoria.dia);
        if (colIndex !== -1) {
          const col = row.querySelectorAll('td')[colIndex + 1];
          if (col) {
            // Agregar un cuadro sobre la celda correspondiente
            const box = document.createElement('div');
            let color;
            let texto;
            if (tutoria.fase === 1) {
              color = '#34C759'; // verde
              texto = 'Tutoría Fase 1';
            } else if (tutoria.fase === 2) {
              color = '#f68b30'; // naranja
              texto = 'Tutoría Fase 2';
            }
            box.style.backgroundColor = color;
            box.style.position = 'absolute';
            box.style.top = `${getRowTop(row)}px`;
            box.style.left = `${getCellLeft(col)}px`;
            box.style.width = `${getCellWidth(col)}px`;
            box.style.height = `${getCellHeight(col) * tutoria.duracion}px`;
            box.style.display = 'flex';
            box.style.borderRadius= '10px';
            box.style.justifyContent = 'center';
            box.style.alignItems = 'center';
            box.style.color = '#fff';
            box.style.fontSize = '12px';
            box.innerHTML = texto;
  
            // Agregar evento de clic para mostrar detalles de la tutoría
            box.addEventListener('click', () => {
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
              detalles.style.height = ' fit-content';
              detalles.style.backgroundColor = '#fff';
              detalles.style.padding = '20px';
              detalles.style.borderRadius = '10px';
              detalles.style.boxShadow = '0 0 10px rgba(0, 0, 0, 0.2)';
              detalles.innerHTML = `
                <div style="display: flex;" class="encabezado">
                  <div style=" display: flex;justify-content: center; width: 100%;" class="tutoriaa">
                    <h1>Tutoría Asignada</h1>
                  </div>
                  <div class="cerrar">
                    <img style="max-height: 30px; margin-right: 15px;" src="img/cerrar.png" alt="">
                  </div>
                </div>
                <div style="font-size:30px; padding-top:20px;" class="datostutoria">
                  <p><strong>Fecha: </strong> ${tutoria.dia} </p>
                  <p><strong>Hora: </strong> ${tutoria.hora} </p>
                  <p><strong>Salon: </strong>${tutoria.salon} </p>
                  <p><strong>Tutor: </strong> ${tutoria.profesor} </p>
                </div>
                <button style="background-color: #f68b30; border: none; color: white; padding: 10px 20px; cursor: pointer; border-radius: 5px; margin-top: 25px; display: block; margin-left: auto; margin-right: auto; " type="button" class="confirmartutoria"> Confirmar tutoria</button>
              `;
  
              const cerrar = detalles.querySelector('.cerrar img');
              cerrar.addEventListener('click', () => {
                document.body.removeChild(modal);
              });
              confirmar = detalles.querySelector('.confirmartutoria');
              confirmar.addEventListener('click', () => {
                if (confirm('¿Estás seguro de confirmar la realización de la tutoría?')) {
                  this.alert('Tutoría confirmada');
                  document.body.removeChild(modal);
                }
              });
            
  
              modal.appendChild(detalles);
  
              document.body.appendChild(modal);
            });
  
            col.appendChild(box);
          }
        }
      }
    });

    // Función para obtener el índice de la fila correspondiente a la hora especificada
    function getHourIndex(hora) {
      const hour = hora.split(':')[0];
      const rows = table.querySelectorAll('tbody tr');
      for (let i = 0; i < rows.length; i++) {
        const row = rows[i];
        const cell = row.querySelector('td:first-child');
        if (cell.textContent === hour + ':00') {
          return i;
        }
      }
      return -1;
    }

    // Función para obtener el índice del día correspondiente
    function getDayIndex(dia) {
      const days = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes'];
      return days.indexOf(dia);
    }

    // Función para obtener la posición vertical de la fila
    function getRowTop(row) {
      return row.getBoundingClientRect().top + window.scrollY;
    }

    // Función para obtener la posición horizontal de la celda
    function getCellLeft(cell) {
      return cell.getBoundingClientRect().left + window.scrollX;
    }

    // Función para obtener el ancho de la celda
    function getCellWidth(cell) {
      return cell.getBoundingClientRect().width;
    }

    // Función para obtener el alto de la celda
    function getCellHeight(cell) {
      return cell.getBoundingClientRect().height;
    }
});
