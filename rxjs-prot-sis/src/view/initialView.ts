import { inputs, units } from "./viewConfig";

export function drawInit(host: HTMLElement) {
  const container = document.createElement("div");
  container.classList.add("main-container");

  const instructionsContainer = document.createElement("div");
  instructionsContainer.classList.add("instructions-container");
  drawInputs(instructionsContainer);
  drawInstructionList(instructionsContainer);
  container.appendChild(instructionsContainer);

  drawSystemUnits(container);
  drawMessageBox(container);

  const cycleCounter = document.createElement("label");
  cycleCounter.classList.add("cycle-count");
  container.appendChild(cycleCounter);

  host.appendChild(container);
}

function drawInputs(host: HTMLDivElement) {
  const inputsContainer = document.createElement("div");
  inputsContainer.classList.add("inputs-container");

  const inputForm = document.createElement("form");
  inputForm.classList.add("inputs-form");

  drawInputFields(inputForm);
  inputsContainer.appendChild(inputForm);

  const buttonAdd = document.createElement("button");
  buttonAdd.innerHTML = "Add Instruction";
  buttonAdd.classList.add("btn-add");
  inputsContainer.appendChild(buttonAdd);

  host.appendChild(inputsContainer);
}

function drawInputFields(host: HTMLFormElement) {
  inputs.forEach((input) => {
    const container = document.createElement("div");
    container.classList.add("input-group");

    const label = document.createElement("label");
    label.innerHTML = input.name;
    label.classList.add("input-label");
    label.htmlFor = input.id;
    container.appendChild(label);

    const inputField = document.createElement("input");
    inputField.type = input.type;
    inputField.value = input.value;
    inputField.id = input.id;
    inputField.name = input.id;
    container.appendChild(inputField);

    host.appendChild(container);
  });
}

function drawInstructionList(host: HTMLDivElement) {
  const instructionListDiv = document.createElement("div");
  const instructionList = document.createElement("ol");
  instructionList.classList.add("instruction-list");
  instructionListDiv.appendChild(instructionList);
  host.appendChild(instructionListDiv);
}

function drawSystemUnits(host: HTMLDivElement) {
  const unitsContainer = document.createElement("div");
  unitsContainer.classList.add("units-container");
  units.forEach((unit) => {
    const unitDiv = document.createElement("div");
    unitDiv.classList.add(unit.name, "system-unit");

    const unitLabel = document.createElement("label");
    unitLabel.innerHTML = unit.name;
    unitDiv.appendChild(unitLabel);

    unitsContainer.appendChild(unitDiv);
  });
  host.appendChild(unitsContainer);
}

function drawMessageBox(host: HTMLDivElement) {
  const messageBox = document.createElement("div");
  messageBox.classList.add("message-box");
  const messageLabel = document.createElement("label");
  messageLabel.classList.add("cycle-count");
  messageBox.appendChild(messageLabel);
  host.appendChild(messageBox);
}
