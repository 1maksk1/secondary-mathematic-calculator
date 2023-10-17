let steps = [];
let currentStep = '';

function addToDisplay(value) {
  document.getElementById('display').value += value;
}

function addDecimal() {
  const currentDisplay = document.getElementById('display').value;
  if (currentDisplay.indexOf('.') === -1) {
    document.getElementById('display').value += '.';
  }
}

function deleteLastKey() {
  const currentDisplay = document.getElementById('display').value;
  document.getElementById('display').value = currentDisplay.slice(0, -1);
}

function clearDisplay() {
  document.getElementById('display').value = '';
  currentStep = '';
}

function calculate() {
  const expression = document.getElementById('display').value;
  try {
    const result = eval(expression);
    currentStep = `${expression} = ${result}`;
    displaySteps();
  } catch (error) {
    currentStep = 'Error';
    displaySteps();
  }
}

function displaySteps() {
  const stepsElement = document.getElementById('steps');
  stepsElement.innerHTML = '<b>Steps:</b><br>';
  steps.forEach((step, index) => {
    stepsElement.innerHTML += `${index + 1}. ${step}`;
    stepsElement.innerHTML += ` <button class="delete-step-button" onclick="deleteStep(${index})">Delete Step</button><br>`;
  });
  stepsElement.innerHTML += currentStep;
}

function saveStep() {
  steps.push(currentStep);
  currentStep = '';
  displaySteps();
}

function deleteStep(index) {
  steps.splice(index, 1);
  displaySteps();
}