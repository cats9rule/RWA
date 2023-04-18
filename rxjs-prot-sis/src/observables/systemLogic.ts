import { Observable, combineLatest, map, switchMap } from "rxjs";
import { Instruction } from "../models/instruction";
import {
  emitCycles,
  handleOperandInput,
  handleOperationInput,
  handleSimulateClick,
} from "./eventHandlers";
import { Operation } from "../models/operation";
import { Operand } from "../models/operand";
import { units } from "../view/viewConfig";

export class SystemLogic {
  public clkCount = 0;
  public instruction: Instruction;

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
          this.instruction = {
            op1: op1,
            op2: op2,
            operation: operation,
          };
          console.log(this.instruction);
        }
      },
      error: (err) => console.log(err),
    });
  }

  private initSimulateButton() {
    const simulateButton: HTMLButtonElement =
      document.querySelector(".btn-simulate");
    handleSimulateClick(simulateButton)
      .pipe(
        map((value) => this.instruction),
        switchMap((instruction) => emitCycles(instruction))
      )
      .subscribe({
        next: (cycle) => {
          if (cycle.unit == "END") {
            const unit: HTMLDivElement = document.querySelector(".WB");
            unit.style.backgroundColor = "darkseagreen";
          } else {
            const index = units.findIndex((unit) => unit.name == cycle.unit);
            const unit: HTMLDivElement = document.querySelector(
              "." + cycle.unit
            );
            if (index != 0) {
              const previousUnit: HTMLDivElement = document.querySelector(
                "." + units[index - 1].name
              );
              previousUnit.style.backgroundColor = "darkseagreen";
            }
            unit.style.backgroundColor = "lightcoral";
          }
          const clks: HTMLLabelElement = document.querySelector(".cycle-count");
          clks.innerHTML = cycle.index.toString();
        },
      });
  }
}
