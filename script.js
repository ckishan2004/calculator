class Calculator {
    constructor(displayElement) {
      this.displayElement = displayElement;
      this.clear();
    }
  
    clear() {
      this.currentValue = '';
      this.previousValue = '';
      this.operation = null;
      this.updateDisplay();
    }
  
    delete() {
      this.currentValue = this.currentValue.toString().slice(0, -1);
      this.updateDisplay();
    }
  
    appendNumber(number) {
      if (number === '.' && this.currentValue.includes('.')) return;
      this.currentValue += number;
      this.updateDisplay();
    }
  
    chooseOperation(operation) {
      if (this.currentValue === '') return;
      if (this.previousValue !== '') {
        this.compute();
      }
      this.operation = operation;
      this.previousValue = this.currentValue;
      this.currentValue = '';
      this.updateDisplay();
    }
  
    compute() {
      let computation;
      const prev = parseFloat(this.previousValue);
      const current = parseFloat(this.currentValue);
      if (isNaN(prev) || isNaN(current)) return;
      switch (this.operation) {
        case '+':
          computation = prev + current;
          break;
        case '-':
          computation = prev - current;
          break;
        case '*':
          computation = prev * current;
          break;
        case '/':
          computation = current !== 0 ? prev / current : 'Error';
          break;
        case '%':
          computation = prev % current;
          break;
        default:
          return;
      }
      this.currentValue = computation;
      this.operation = null;
      this.previousValue = '';
      this.updateDisplay();
    }
  
    updateDisplay() {
      this.displayElement.value = this.previousValue + (this.operation ? ` ${this.operation} ` : '') + this.currentValue;
    }
  }
  
  const display = document.querySelector('input');
  const buttons = document.querySelectorAll('button');
  const calculator = new Calculator(display);
  
  buttons.forEach(button => {
    button.addEventListener('click', () => {
      if (button.classList.contains('opBtn')) {
        calculator.chooseOperation(button.innerText);
      } else if (button.classList.contains('equleBtn')) {
        calculator.compute();
      } else if (button.innerText === 'AC') {
        calculator.clear();
      } else if (button.innerText === 'DEL') {
        calculator.delete();
      } else {
        calculator.appendNumber(button.innerText);
      }
    });
  });
  