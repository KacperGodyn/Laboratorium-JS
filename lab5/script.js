function asyncAdd(a, b) {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(a + b);
      }, 100);
    });
  }
  
  async function addNumbers(...numbers) {
    if (numbers.length === 0) return 0;
    let sum = numbers[0];
    for (let i = 1; i < numbers.length; i++) {
      sum = await asyncAdd(sum, numbers[i]);
    }
    return sum;
  }
  
  function measureTime(fn, ...args) {
    const start = performance.now();
    return fn(...args).then(result => {
      const end = performance.now();
      return { result, time: end - start };
    });
  }
  
  async function optimizedAddNumbers(...numbers) {
    while (numbers.length > 1) {
      const promises = [];
      for (let i = 0; i < numbers.length; i += 2) {
        if (i + 1 < numbers.length) {
          promises.push(asyncAdd(numbers[i], numbers[i + 1]));
        } else {
          promises.push(Promise.resolve(numbers[i]));
        }
      }
      numbers = await Promise.all(promises);
    }
    return numbers[0];
  }
  
  async function startTest() {
    const numbers = Array.from({ length: 100 }, () => Math.floor(Math.random() * 100));
  
    const normalResult = await measureTime(addNumbers, ...numbers);
    document.getElementById('result').textContent = `Result: ${normalResult.result}`;
    document.getElementById('time').textContent = `Normal Add Time: ${normalResult.time.toFixed(2)} ms`;
  
    const optimizedResult = await measureTime(optimizedAddNumbers, ...numbers);
    document.getElementById('result').textContent += `\nOptimized Result: ${optimizedResult.result}`;
    document.getElementById('time').textContent += `\nOptimized Add Time: ${optimizedResult.time.toFixed(2)} ms`;
  }
  
  document.getElementById('startButton').addEventListener('click', startTest);
  