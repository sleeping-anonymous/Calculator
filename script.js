let prev = "";
let current = "";
let operator = "";
let operatorIndex = -1;

const btns = document.querySelectorAll("button");
const result = document.querySelector(".result");
result.textContent = "";
const operators = "+-*/";

function calculate(str) {
    prev = parseFloat(prev);
    current = parseFloat(str.slice(operatorIndex + 1));
    switch (operator) {
        case "+": result.textContent = formatResult(prev + current);
            prev = prev + current;
            current = "";
            operator = "";
            operatorIndex = -1;
            break;

        case "-": result.textContent = formatResult(prev - current);
            prev = prev - current;
            current = "";
            operator = "";
            operatorIndex = -1;
            break;

        case "*": result.textContent = formatResult(prev * current);
            prev = prev * current;
            current = "";
            operator = "";
            operatorIndex = -1;
            break;

        case "/": if (current === 0) {
            result.textContent = `can't divide by zero`;
            break;
        }
        else {
            result.textContent = formatResult(prev / current);
            prev = parseFloat((prev / current).toFixed(5));
            current = "";
            operator = "";
            operatorIndex = -1;
            break;
        }
        default: result.textContent = `Wrong Input`;
    }
}

btns.forEach(btn => {
    btn.addEventListener("click", function (e) {
        if (btn.classList.contains("number")) {
            numberClick(e);
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
        else if (btn.classList.contains("dot")) {
            dotClick(e);
        }
        else {
            calculate(result.textContent);
        }
    })
})

function numberClick(e) {
    result.textContent += e.target.textContent;
}

function operatorClick(e) {
    if (operator && !operators.includes(result.textContent.at(-1))) {
        calculate(result.textContent);
    }
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
    }
    operatorIndex = result.textContent.length - 1;
}

function dotClick(e) {
    if (operator) {
        const currentNo = result.textContent.split(/[\+\-\*\/]/).pop();   // breaks text to 2 parts before and after operator using regex  and prev is popped
        if (currentNo.includes(".")) {
            return;
        }
        else {
            result.textContent += e.target.textContent;
        }
    }
    else {
        if (result.textContent.includes(".")) {
            return;
        }
        result.textContent += e.target.textContent;
    }
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

function formatResult(num) {
    const rounded = parseFloat(num.toFixed(5));   // removes trailing zeroes if more are there 
    return rounded;
}


document.addEventListener("keydown", keyboardSupport);

function keyboardSupport(e) {
    const key = e.key;
    if (!isNaN(key)) { // is a number
        numberClick({ target: { textContent: key } });
    }
    else if (operators.includes(key)) {
        operatorClick({ target: { textContent: key } });   // since fxn needs e.target.textContent = "+" . it provides that
    }
    else if (key === "Enter" || key === "=") {
        calculate(result.textContent);
    }
    else if (key === "Backspace") {
        deleteClick();
    }
    else if (key === "Escape") {
        clearClick();
    }
    else if (key === ".") {
        dotClick({ target: { textContent: key } });
    }

}