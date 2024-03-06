var calculate = document.getElementById('Calculate')
calculate.addEventListener("click", calculateSumAvgMinMax)

document.getElementById('addInput').addEventListener('click', addInputField)
document.getElementById('removeInput').addEventListener('click', removeInputField)

function addInputField() {
    var newInput = document.createElement('input')
    newInput.type = 'text'
    newInput.placeholder = `Liczba`
    newInput.classList.add('dynamic-input')
    newInput.addEventListener('input', calculateSumAvgMinMax)
    var br = document.createElement('br')
    document.getElementById('inputContainer').appendChild(newInput)
    document.getElementById('inputContainer').appendChild(br)
    document.getElementById('inputContainer').appendChild(br.cloneNode())
}

function removeInputField() {
    var inputContainer = document.getElementById('inputContainer');
    var inputs = inputContainer.querySelectorAll('input[type="text"]');
    if (inputs.length > 0) {
        inputContainer.removeChild(inputs[inputs.length - 1]);
        inputContainer.removeChild(inputContainer.lastChild); 
        inputContainer.removeChild(inputContainer.lastChild);
    }
}

function calculateSumAvgMinMax () {
    let inputs = document.querySelectorAll('.container-text input[type="text"]')
    let numbers = Array.from(inputs).map(input => parseInt(input.value, 10) || 0)
    
    let sum = numbers.reduce((a, b) => a + b, 0)
    document.getElementById('sum').textContent = sum

    let average = numbers.length > 0 ? sum / numbers.length : 0
    document.getElementById('average').textContent = average

    let min = Math.min(...numbers)
    document.getElementById('min').textContent = min

    let max = Math.max(...numbers)
    document.getElementById('max').textContent = max
}
