let billInput = document.getElementById("bill");
let amountOfPeopleInput = document.getElementById("amount-of-people");
let customPercentage = document.getElementById("custom-percent");
let tipAmountPerson = document.querySelector(".tip-amount-person span.figure");
let totalAmountPerson = document.querySelector(".total-amount-person span.figure");
let billError = document.querySelector('label[for="bill"].error');
let amountOfPeopleError = document.querySelector('label[for="amount-of-people"].error');
let resetBtn = document.getElementById("tip-form-reset");

let bill = 0;
let amountOfPeople = 0;
let tipPercentage = 0;

let radioBtns = document.forms["tipForm"].tipAmount;
let checkedRadioBtn = document.querySelector('input[name="tipAmount"][type="radio"]:checked');

for (var i = 0; i < radioBtns.length; i++) {
  radioBtns[i].addEventListener("change", function () {
    customPercentage.parentElement.classList.remove("red-border");
    tipPercentage = parseInt(this.value);
    calculate();
  });
}

billInput.addEventListener("input", (e) => {
  bill = e.target.value;
  calculate();
});

amountOfPeopleInput.addEventListener("input", (e) => {
  amountOfPeople = e.target.value;
  calculate();
});

customPercentage.addEventListener("input", (e) => {
  tipPercentage = parseInt(e.target.value);
  if (checkedRadioBtn) {
    checkedRadioBtn.checked = false;
  }
  calculate();
});

function checkInput(object) {
  let errorLabel = object.parentElement.parentElement.firstElementChild.querySelector("label.error");

  if (object.value == 0) {
    object.parentElement.classList.add("red-border");
    if (object.id === "custom-percent") return;
    errorLabel.style.cssText = "display: initial";
    errorLabel.textContent = "Can't be zero";
  } else {
    object.parentElement.classList.remove("red-border");
    if (object.id === "custom-percent") return;
    errorLabel.style.cssText = "";
    errorLabel.textContent = "";
  }

  if (object.value.length > object.maxLength) object.value = object.value.slice(0, object.maxLength);
  if (object.id === "amount-of-people") {
    if (!object.value) {
      object.value = "";
      return;
    }
    if (!isNaN(object.value) && !Number.isInteger(object.value)) object.value = parseInt(object.value);
  }
}

function calculate() {
  if (isNaN(tipPercentage)) {
    return;
  }
  if (!bill || bill == 0) {
    billInput.parentElement.classList.add("red-border");
    return;
  }
  if (!amountOfPeople || amountOfPeople == 0) {
    amountOfPeopleInput.parentElement.classList.add("red-border");
    return;
  }

  let tipAmount = (bill * (tipPercentage / 100)) / amountOfPeople;
  let totalAmount = ((bill * 1 + tipAmount * amountOfPeople) / amountOfPeople) * 1;

  tipAmountPerson.textContent = tipAmount.toFixed(2);
  totalAmountPerson.textContent = totalAmount.toFixed(2);
}

resetBtn.addEventListener("click", () => {
  bill = 0;
  tipPercentage = 0;
  amountOfPeople = 0;
  tipAmountPerson.textContent = "0.00";
  totalAmountPerson.textContent = "0.00";
});
