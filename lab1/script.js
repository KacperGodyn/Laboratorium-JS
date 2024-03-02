
var Calculate = document.getElementById('Calculate')
Calculate.addEventListener("click", CalculateSumAvgMinMax)
document.getElementById('numberOne').addEventListener('input', CalculateSumAvgMinMax)
document.getElementById('numberTwo').addEventListener('input', CalculateSumAvgMinMax)
document.getElementById('numberThree').addEventListener('input', CalculateSumAvgMinMax)
document.getElementById('numberFour').addEventListener('input', CalculateSumAvgMinMax)


function CalculateSumAvgMinMax () {
    let numberOne = parseInt(document.getElementById('numberOne').value, 10)
    let numberTwo = parseInt(document.getElementById('numberTwo').value, 10)
    let numberThree = parseInt(document.getElementById('numberThree').value, 10)
    let numberFour = parseInt(document.getElementById('numberFour').value, 10)



    const arr = [numberOne, numberTwo, numberThree, numberFour]

    let sum = numberOne + numberTwo + numberThree + numberFour
    document.getElementById('sum').textContent = sum

    
    let average = arr.reduce((a, b) => a + b, 0) / arr.length
    document.getElementById('average').textContent = average

    let min = Math.min(...arr)
    document.getElementById('min').textContent = min

    let max = Math.max(...arr)
    document.getElementById('max').textContent = max
}
