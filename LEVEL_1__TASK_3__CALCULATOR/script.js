document.addEventListener('DOMContentLoaded', function() {
    const result = document.getElementById('result');
    const buttons = document.querySelectorAll('button');

    let currentInput = '';
    let currentOperator = '';
    let previousInput = '';

    buttons.forEach(button => {
        button.addEventListener('click', function() {
            const value = this.getAttribute('data-value');

            if (value >= '0' && value <= '9' || value === '.') {
                handleNumber(value);
            } else if (['+', '-', '*', '/'].includes(value)) {
                handleOperator(value);
            } else if (value === '=') {
                handleEquals();
            } else if (value === 'C') {
                clearCalculator();
            }

            updateDisplay();
        });
    });

    function handleNumber(num) {
        if (num === '.' && currentInput.includes('.')) return;
        currentInput += num;
    }

    function handleOperator(op) {
        if (currentInput === '' && previousInput === '') return;
        if (currentInput !== '') {
            if (previousInput !== '') {
                handleEquals();
            }
            previousInput = currentInput;
            currentInput = '';
        }
        currentOperator = op;
    }

    function handleEquals() {
        if (currentInput === '' || previousInput === '' || currentOperator === '') return;
        let calculation;
        const prev = parseFloat(previousInput);
        const current = parseFloat(currentInput);
        switch (currentOperator) {
            case '+':
                calculation = prev + current;
                break;
            case '-':
                calculation = prev - current;
                break;
            case '*':
                calculation = prev * current;
                break;
            case '/':
                calculation = prev / current;
                break;
            default:
                return;
        }
        currentInput = calculation.toString();
        previousInput = '';
        currentOperator = '';
    }

    function clearCalculator() {
        currentInput = '';
        currentOperator = '';
        previousInput = '';
    }

    function updateDisplay() {
        result.value = currentInput || '0';
    }
});