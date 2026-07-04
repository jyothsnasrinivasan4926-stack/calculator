const display = document.getElementById('display');

function appendNumber(num) {
    display.value += num;
}

function appendOperator(op) {
    const lastChar = display.value[display.value.length - 1];
    
    // Prevent multiple operators in a row
    if (['+', '-', '*', '/', '.'].includes(lastChar)) {
        return;
    }
    
    // Prevent operator at the start
    if (display.value === '') {
        return;
    }
    
    display.value += op;
}

function clearDisplay() {
    display.value = '';
}

function deleteLast() {
    display.value = display.value.slice(0, -1);
}

function calculate() {
    try {
        // Replace symbols with standard operators
        let expression = display.value
            .replace(/×/g, '*')
            .replace(/−/g, '-')
            .replace(/,/g, '.');
        
        // Evaluate the expression
        const result = eval(expression);
        
        // Check if result is a valid number
        if (isNaN(result) || !isFinite(result)) {
            display.value = 'Error';
            return;
        }
        
        // Display result with up to 10 decimal places
        display.value = Math.round(result * 10000000000) / 10000000000;
    } catch (error) {
        display.value = 'Error';
    }
}

// Allow keyboard input
document.addEventListener('keydown', (e) => {
    if (/[0-9]/.test(e.key)) {
        appendNumber(e.key);
    } else if (e.key === '+' || e.key === '-' || e.key === '*' || e.key === '/') {
        appendOperator(e.key);
    } else if (e.key === '.') {
        appendOperator(e.key);
    } else if (e.key === 'Enter') {
        calculate();
    } else if (e.key === 'Backspace') {
        deleteLast();
    } else if (e.key === 'Escape') {
        clearDisplay();
    }
});