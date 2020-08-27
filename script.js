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
		case "multiply":
			equation.innerHTML += "x";
			toCalculate += "*";
			break;
		case "open-bracket":
			equation.innerHTML += "(";
			toCalculate += "(";
			break;
		case "close-bracket":
			equation.innerHTML += ")";
			toCalculate += ")";
			break;
		case "subtract":
			equation.innerHTML += "-";
			toCalculate += "-";
			break;
		case "add":
			equation.innerHTML += "+";
			toCalculate += "+";
			break;
		case "power":
			equation.innerHTML += "^";
			toCalculate += "^";
			break;
		case "sqrt":
			equation.innerHTML += "&#8730;";
			toCalculate += "$";
			break;
		case "dot":
			equation.innerHTML += ".";
			toCalculate += "."
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
}

function convertToReversePolishNotation(toConvert) {
	console.log(toConvert);
}