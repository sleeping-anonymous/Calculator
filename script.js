let prev = "";
let current = "";
let operator = "";

const btns = document.querySelectorAll("button");
const result = document.querySelector(".result");
result.textContent = "";
const operators = "+-*/";

// function calculate(str) {
//     let arr = str.split(" ");
//     console.log(arr);
//     prev = parseFloat(arr[0]);
//     current = parseFloat(arr[2]);
//     operator = arr[1];
//     console.log(`${prev} ${current} ${operator}`)
//     switch (operator) {
//         case "+": return prev + current;  // no need for breaks since return used 

//         case "-": return prev - current;

//         case "*": return prev * current;

//         case "/": if (current === 0) {
//             return "can't divide by zero";
//         }
//         else {
//             return (prev / current).toFixed(5);
//         }

//     }
// }

btns.forEach(btn => {
    btn.addEventListener("click", function (e) {
        if (btn.classList.contains("number")) {

            console.log(e.target);
            result.textContent += e.target.textContent;
        }
        else if (btn.classList.contains("operators")) {
            operatorClick(e);

        }
        else if (btn.classList.contains("clear")) {
            clearClick();
        }
        else if (btn.classList.contains("del")) {
            deleteClick(e);
        }
        else {
            calculate();
        }
    })
})

function operatorClick(e) {
    const display = result.textContent;
    const lastChar = display.charAt(display.length - 1);
    if (operators.includes(lastChar)) {
        result.textContent = display.slice(0, -1) + e.target.textContent; // returns complete display excluding the last element (-1 here)
        operator = e.target.textContent;
    }
    else {
        prev = display;
        result.textContent += e.target.textContent;
        operator = e.target.textContent;

    } console.log(operator);
}

function clearClick() {
    result.textContent = "";
    prev = "";
    operator = "";
    current = "";
}

function deleteClick(e) {
    result.textContent = result.textContent.slice(0, -1);
}

