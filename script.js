"use strict";

const billInput = document.getElementById("bill");
const customInput = document.getElementById("custom");
const peopleInput = document.getElementById("people");
const tipAmountOutput = document.querySelector(".tips-amount .amount p");
const totalOutput = document.querySelector(".tips-amount .total p");
const resetBtn = document.getElementById("reset-btn");

// Add event listeners
billInput.addEventListener("input", calculateAmounts);
customInput.addEventListener("input", calculateAmounts);
peopleInput.addEventListener("input", calculateAmounts);
resetBtn.addEventListener("click", resetCalculator);

// Select the tip percentage buttons
const tipButtons = document.querySelectorAll(".percentage-btns button");
tipButtons.forEach(button => {
  button.addEventListener("click", selectTipPercentage);
});

// Function to calculate tip and total amounts
function calculateAmounts() {
  const bill = parseFloat(billInput.value);
  const tipPercentage = parseFloat(customInput.value) || getSelectedTipPercentage();
  const people = parseInt(peopleInput.value);

  if (bill && tipPercentage && people) {
    const tipAmount = (bill * tipPercentage) / 100 / people;
    const total = (bill / people) + tipAmount;

    tipAmountOutput.innerHTML = `<img src="./images/icon-dollar.svg" alt="dollar"> ${tipAmount.toFixed(2)}`;
    totalOutput.innerHTML = `<img src="./images/icon-dollar.svg" alt="dollar"> ${total.toFixed(2)}`;
  } else {
    tipAmountOutput.innerHTML = `<img src="./images/icon-dollar.svg" alt="dollar"> 0.00`;
    totalOutput.innerHTML = `<img src="./images/icon-dollar.svg" alt="dollar"> 0.00`;
  }
}

// Function to get the selected tip percentage
function getSelectedTipPercentage() {
    const selectedBtn = document.querySelector(".percentage-btns button.active");
    
    if (selectedBtn) {
        return parseFloat(selectedBtn.textContent);
    } else {
        return parseFloat(customInput.value) || 0;
    }
}

// Function to select a tip percentage
function selectTipPercentage() {
  tipButtons.forEach(button => button.classList.remove("active"));
  this.classList.add("active");
  customInput.value = "";
  calculateAmounts();
}

// Function to reset the calculator
function resetCalculator() {
  billInput.value = "";
  customInput.value = "";
  peopleInput.value = "";
  tipButtons.forEach(button => button.classList.remove("active"));
  tipAmountOutput.innerHTML = `<img src="./images/icon-dollar.svg" alt="dollar"> 0.00`;
  totalOutput.innerHTML = `<img src="./images/icon-dollar.svg" alt="dollar"> 0.00`;
}

