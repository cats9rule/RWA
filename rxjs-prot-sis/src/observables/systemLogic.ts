import { Instruction } from "../models/instruction";
import {
  handleAddInstructionClick,
  handleOperationInput,
  handleSimulateClick,
} from "./eventHandlers";

export class SystemLogic {
  public clkCount = 0;
  public instructions: Instruction[] = [];

  constructor() {
    this.initEventHandlers();
  }

  public makeInstruction() {}
  private initEventHandlers() {
    this.initInputs();
    this.initAddButton();
    this.initSimulateButton();
  }

  private initInputs() {
    const operationInput: HTMLInputElement =
      document.querySelector(".operation");
    const op1: HTMLInputElement = document.querySelector(".op1");
    const op2: HTMLInputElement = document.querySelector(".op2");

    handleOperationInput(operationInput).subscribe({
      next: (operation) => console.log(operation),
    });
  }
  private initAddButton() {
    const addButton: HTMLButtonElement = document.querySelector(".btn-add");
    handleAddInstructionClick(addButton).subscribe({
      next: (value) => console.log(value),
    });
  }
  private initSimulateButton() {
    const simulateButton: HTMLButtonElement =
      document.querySelector(".btn-simulate");
    handleSimulateClick(simulateButton).subscribe({
      next: (value) => console.log(value),
    });
  }
}
