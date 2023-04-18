import { Observable, combineLatest } from "rxjs";
import { Instruction } from "../models/instruction";
import {
  handleOperandInput,
  handleOperationInput,
  handleSimulateClick,
} from "./eventHandlers";
import { Operation } from "../models/operation";
import { Operand } from "../models/operand";

export class SystemLogic {
  public clkCount = 0;
  public instructions: Instruction[] = [];

  private operation$: Observable<Operation>;
  private operand1$: Observable<Operand>;
  private operand2$: Observable<Operand>;

  constructor() {
    this.initEventHandlers();
  }

  private initEventHandlers() {
    this.initInputs();
    this.initSimulateButton();
  }

  private initInputs() {
    const operationInput: HTMLInputElement =
      document.querySelector(".operation");
    const op1: HTMLInputElement = document.querySelector(".op1");
    const op2: HTMLInputElement = document.querySelector(".op2");

    this.operation$ = handleOperationInput(operationInput);
    this.operand1$ = handleOperandInput(op1, 0);
    this.operand2$ = handleOperandInput(op2, 1);

    combineLatest([this.operation$, this.operand1$, this.operand2$]).subscribe({
      next: ([operation, op1, op2]) => {
        if (operation && op1.value && op2.value) {
          this.instructions.push({
            index: this.instructions.length,
            op1: op1,
            op2: op2,
            operation: operation
          });
          console.log(this.instructions);
        }
      },
      error: (err) => console.log(err)
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
