(function () {

  let previousTxt = document.querySelector('.previousTxt');

  let currentTxt = document.querySelector('.currentTxt');

  let ac = document.getElementById('ac');

  let dl = document.getElementById('dl');

  let eql = document.getElementById('eql')

  let operators = document.querySelectorAll('.operator');

  let numbers = document.querySelectorAll('.number')

  /* ============== */

  let previousValue = '';
  let currentValue = '';
  let operator = '';


  /* display to USER  Interface */
  const displayUi = () => {
    currentTxt.innerHTML = Number(currentValue).toLocaleString('en');
    previousTxt.innerHTML = `${previousValue} ${operator}`;
  }

  /* set numbers */

  let setValue = (number) => {
    currentValue += number;
  }


  /* set operator */

  let allOperators = (operators) => {
    if (operator && currentValue) {
      previousValue = calculation()
    }
    else {
      previousValue = currentValue;
    }
    operator = operators;
    currentValue = '';
  }


  function calculation() {
    switch (operator) {
      case '%':
        return Number(previousValue) % Number(currentValue);
        break;
      case '/':
        return Number(previousValue) / Number(currentValue);
        break;
      case '*':
        return Number(previousValue) * Number(currentValue);
        break;
      case '+':
        return Number(previousValue) + Number(currentValue);
        break;
      case '-':
        return Number(previousValue) - Number(currentValue);
        break;
      default:
        return 0;
    }
  }



  /* selected each number button */

  numbers.forEach((number) => {
    number.addEventListener('click', function (e) {
      if (e.target.textContent === '.' && currentValue.includes('.')) {
        return;
      }
      setValue(e.target.textContent);
      displayUi();
    })
  })



  /* operators */

  operators.forEach(operator => {
    operator.addEventListener('click', function (e) {
      if (currentValue === '') {
        return;
      }
      allOperators(e.target.innerHTML);
      displayUi()
    })
  })

  /* eql event */
  document.getElementById('eql').addEventListener('click', function () {

    if (!operator) return;
    if (!currentValue) {
      currentValue = previousValue;
    } else {

      currentValue = calculation()
    }
    previousValue = '';
    operator = '';
    displayUi()

  })

  document.getElementById('ac').addEventListener('click', function () {
    previousValue = '';
    currentValue = '';
    operator = '';
    displayUi();

  })

  document.getElementById('dl').addEventListener('click', function (e) {
    currentValue = currentValue.slice(0, -1)
    displayUi()
  })

})()