let prev = "";
let current = "";
let operator = "";

function calculate(str) {
    let arr = str.split(" ");
    console.log(arr);
    prev = parseFloat(arr[0]);
    current = parseFloat(arr[2]);
    operator = arr[1];
    console.log(`${prev} ${current} ${operator}`)
    switch (operator) {
        case "+": return prev + current;  // no need for breaks since return used 

        case "-": return prev - current;

        case "*": return prev * current;

        case "/": if (current === 0) {
            return "can't divide by zero";
        }
        else {
            return (prev / current).toFixed(5);
        }

    }
}

console.log(calculate("5 * 3.6"));


