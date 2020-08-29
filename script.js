// drag calculator

const header = document.querySelector(".header");
const calc = document.querySelector(".calc");
const container = document.querySelector(".container");

let active = false;
let currentX;
let currentY;
let initialX;
let initialY;
let xOffset = 0;
let yOffset = 0;

container.addEventListener("mousedown", dragStart, false);
container.addEventListener("mouseup", dragEnd, false);
container.addEventListener("mousemove", drag, false);

function dragStart(e) {
	initialX = e.clientX - xOffset;
	initialY = e.clientY - yOffset;

	if (e.target === header) {
		active = true;
	}
}

function dragEnd(e) {
	initialX = currentX;
	initialY = currentY;

	active = false;
}

function drag(e) {
	if (active) {
	
		e.preventDefault();
	
		currentX = e.clientX - initialX;
		currentY = e.clientY - initialY;

		xOffset = currentX;
		yOffset = currentY;

		setTranslate(currentX, currentY, calc);
	}
}

function setTranslate(xPos, yPos, el) {
	el.style["transform"] = `translate(${xPos}px, ${yPos}px)`;
}

// end drag calculator

const buttons = document.querySelectorAll(".button");
const equation = document.querySelector(".equation");
const pastEquations = document.querySelector(".display .past-equations");
const equalSigns = document.querySelector(".display .equal-signs");
const pastResults = document.querySelector(".display .past-results");
let toCalculate = "";

buttons.forEach(function(button) {
	button.addEventListener("click", addToScreen);
});

function addToScreen(e) {
	let data = e.target.getAttribute("data");

	switch (data) {
		case "clear":
			if (!toCalculate) {
				pastEquations.innerHTML = "";
				equalSigns.innerHTML = "";
				pastResults.innerHTML = "";
			}
			equation.innerHTML = "";
			toCalculate = "";
			break;

		case "divide":
			equation.innerHTML += "&#247;";
			toCalculate += "/";
			break;

		case "sqrt":
			equation.innerHTML += "&#8730;";
			toCalculate += "$";
			break;

		case "back":
			equation.innerHTML = equation.innerHTML.slice(0, -1);
			toCalculate = toCalculate.slice(0, -1);
			break;

		case "equals":
			if (toCalculate) {
				pastEquations.innerHTML += equation.textContent + "<br>";
				equalSigns.innerHTML += "=<br>";
				makeCalculation(toCalculate);
				equation.innerHTML = "";
				toCalculate = "";
			}
			break;

		default:
			equation.innerHTML += data;
			toCalculate += data;
	}
}

function makeCalculation(calculation) {
	let converted = convertToReversePolishNotation(calculation);
	console.log(converted);
}

function convertToReversePolishNotation(toConvert) {
	let stack = [];
	let output = [];
	let temp = "";
	const precedence = { "+": 1, "-": 1 , "x": 2, "/": 2, "^": 3, "$": 3 };

	if ("+-x/(^$.".includes(toConvert[toConvert.length-1])) {
		toConvert = toConvert.slice(0, -1);
	}

	for (let c of toConvert) {
		if ("0123456789.%".includes(c)) {
			temp += c;
		}
		else if ("+-x/^$".includes(c)) {
			if (temp) {
				output.push(temp);
				temp = "";
			}
			else if (!temp && c !== "$") {
				return false;
			}
			while ((stack.length > 0) && ((precedence[stack[stack.length-1]] > precedence[c]) || 
					(precedence[stack[stack.length-1]] === precedence[c] && "+-x/".includes(c)) && (stack[stack.length-1] !== "("))) {
				output.push(stack.pop());
			}
			stack.push(c);
		}
		else if (c === "(") {
			stack.push(c);
		}
		else if (c === ")") {
			if (temp) {
				output.push(temp);
				temp = "";
			}
			while (stack[stack.length-1] !== "(") {
				if (stack.length === 0) {
					return false;
				}
				output.push(stack.pop());
			}
			if (stack[stack.length-1] === "(") {
				stack.pop();
			}
		}
	}

	if (temp) {
		output.push(temp);
	}

	while (stack.length > 0) {
		if (stack[stack.length-1] === "(") {
			return false;
		}
		output.push(stack.pop());
	}

	return output;
}