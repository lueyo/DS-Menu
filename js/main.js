function setClock() {
    const currentDate = new Date();
    const secondsRatio = currentDate.getSeconds() / 60;
    const minutesRatio = (secondsRatio + currentDate.getMinutes()) / 60;
    const hoursRatio = (minutesRatio + currentDate.getHours()) / 12;

    setRotation(document.querySelector('.second-hand'), secondsRatio);
    setRotation(document.querySelector('.minute-hand'), minutesRatio);
    setRotation(document.querySelector('.hour-hand'), hoursRatio);

    // Formatear la hora y los minutos a 2 dígitos y actualizar el contenido del elemento .hour
    const hours = String(currentDate.getHours()).padStart(2, '0');
    const minutes = String(currentDate.getMinutes()).padStart(2, '0');
    document.querySelector('.hour').textContent = `${hours}:${minutes}`;

    // Formatear el mes y el año a 2 dígitos
    const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Los meses en JavaScript van de 0 a 11
    const year = String(currentDate.getFullYear());

    // Actualizar el contenido de todos los elementos .date
    document.querySelectorAll('.date').forEach(dateElement => {
        if (dateElement.classList.contains('upcalendar')) {
            // Si el elemento tiene la clase .upcalendar, usar el formato "MM"/"YYYY"
            dateElement.textContent = `${month}/${year}`;
        } else {
            // De lo contrario, usar el formato MM/YY
            dateElement.textContent = `${month}/${year.slice(-2)}`;
        }
    });
}

// Resto del código...

function setRotation(element, rotationRatio) {
    var rotationDegrees = rotationRatio * 360;
    element.style.transform = 'rotate(' + rotationDegrees + 'deg)';
}

function fillDaysTable() {
    const currentDate = new Date();
    const month = currentDate.getMonth();
    const year = currentDate.getFullYear();

    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDayOfWeek = new Date(year, month, 1).getDay();

    const cells = document.querySelectorAll('.dias tr:not(.nombre-dias) td');

    let day = 1;

    for (let i = 0; i < cells.length; i++) {
        const span = cells[i].querySelector('span'); // Select the span inside the cell

        if (i >= firstDayOfWeek && day <= daysInMonth) {
            span.textContent = day; // Change the span's text content

            cells[i].className = cells[i].className.replace(/day-\d+/g, '');
            cells[i].classList.add(`day-${day}`);

            if (day === currentDate.getDate()) {
                cells[i].classList.add('actual-day');
            }

            day++;
        } else {
            span.textContent = ''; // Clear the span's text content

            cells[i].className = cells[i].className.replace(/day-\d+/g, '');
        }
    }

    const lastRow = document.querySelector('.dias .semana6');
    const allEmpty = Array.from(lastRow.querySelectorAll('td')).every(td => td.textContent === '');

    if (allEmpty) {
        lastRow.classList.add('hidden');
    } else {
        lastRow.classList.remove('hidden');
    }
}

// Llamar a la función al cargar la página y cada vez que cambia el minuto
setClock();
setInterval(setClock, 1000);
window.addEventListener('load', fillDaysTable);
setInterval(fillDaysTable, 60000);
