// Variables
const billInput = document.getElementById('bill');
const peopleInput = document.getElementById('people');
const tipAmountLabel = document.getElementById('tip-amount');
const totalLabel = document.getElementById('total');
const tipButtons = document.querySelectorAll('.caja[data-percent]');
const customTipInput = document.getElementById('custom-tip');
const pasajero = document.getElementById('pasajero');
const resetButton = document.getElementById('reset');
const errorContainer = document.querySelector('.error-container');

let bill = 0;
let people = 0; // Comienza en 0
let tipPercent = 0;

// Función para calcular y actualizar los valores
function calculate() {
    if (bill > 0 && tipPercent > 0 && people > 0) {
        const tipAmount = (bill * tipPercent / 100) / people;
        const total = (bill * (1 + tipPercent / 100)) / people;

        updateLabels(tipAmount, total);
        enableResetButton(true);
    } else {
        clearLabels();
        enableResetButton(false);
    }
}

// Función para actualizar etiquetas
function updateLabels(tipAmount, total) {
    tipAmountLabel.textContent = `$${tipAmount.toFixed(2)}`;
    totalLabel.textContent = `$${total.toFixed(2)}`;
}

// Función para limpiar etiquetas
function clearLabels() {
    tipAmountLabel.textContent = '$0.00';
    totalLabel.textContent = '$0.00';
}

// Función para habilitar/deshabilitar el botón de reset
function enableResetButton(enable) {
    if (enable) {
        resetButton.style.backgroundColor = 'hsl(172, 67%, 45%)';
        resetButton.disabled = false;
    } else {
        resetButton.style.backgroundColor = '';
        resetButton.disabled = true;
    }
}

// Función para manejar clics en botones de porcentaje
function handleTipButtonClick(button) {
    tipPercent = parseFloat(button.getAttribute('data-percent'));
    customTipInput.value = ''; // Limpiar el porcentaje personalizado
    updateButtonStyles();
    calculate();
}

// Función para manejar la entrada de porcentaje personalizado
function handleCustomTipInput() {
    tipPercent = parseFloat(customTipInput.value) || 0;
    updateButtonStyles();
    calculate();
}

// Función para actualizar estilos de botones de porcentaje
function updateButtonStyles() {
    if (customTipInput.value.trim() === '') {
        tipButtons.forEach(button => {
            button.style.backgroundColor = '';
        });
    } else {
        tipButtons.forEach(button => {
            button.style.backgroundColor = 'hsl(183, 100%, 15%)';
        });
    }
}

// Función para manejar errores en el número de personas
function handlePeopleInput() {
    if (people <= 0) {
        errorContainer.classList.remove('hidden'); // Mostrar mensaje de error
    } else {
        errorContainer.classList.add('hidden'); // Ocultar mensaje de error
    }
    calculate();
}

// Función para manejar el clic en el botón de reset
function reset() {
    bill = 0;
    people = 0; // Reinicia a 0
    tipPercent = 0;

    billInput.value = '0';
    peopleInput.value = '0';
    customTipInput.value = '';
    errorContainer.classList.add('hidden'); // Ocultar error
    clearLabels();
    updateButtonStyles();
    enableResetButton(false);
}

// Eventos
function setupEventListeners() {
    // Manejar clics en botones de porcentaje
    tipButtons.forEach(button => {
        button.addEventListener('click', () => handleTipButtonClick(button));
    });

    // Manejar entrada de porcentaje personalizado
    customTipInput.addEventListener('input', handleCustomTipInput);

    // Manejar entrada de valores de factura y personas
    document.addEventListener('input', (event) => {
        if (event.target.id === 'bill') {
            bill = parseFloat(event.target.value) || 0;
        }
        if (event.target.id === 'people') {
            people = parseInt(event.target.value, 10) || 0;
            handlePeopleInput();
        }
        calculate();
    });

    // Manejar clic en el botón de reset
    resetButton.addEventListener('click', reset);

    // Manejar la clase activa en los botones
    document.querySelectorAll('button').forEach((button) => {
        button.addEventListener('click', () => {
            document.querySelectorAll('button').forEach(item => item.classList.remove('active'));
            button.classList.add('active');
        });
    });
}

// Inicializar
setupEventListeners();
