import {
  Observable,
  combineLatest,
  concatMap,
  debounceTime,
  delay,
  filter,
  from,
  fromEvent,
  map,
  of,
  switchMap,
  timer,
} from "rxjs";
import { getOperation, getRegistry } from "./apiService";
import { Operation } from "../models/operation";
import { Operand } from "../models/operand";
import { Instruction } from "../models/instruction";
import { Cycle } from "../models/cycle";

export function handleOperationInput(
  inputField: HTMLInputElement
): Observable<Operation> {
  return fromEvent(inputField, "input").pipe(
    debounceTime(500),
    map((event: InputEvent) =>
      (<HTMLInputElement>event.target).value.toUpperCase()
    ),
    filter((opname) => opname.length == 3),
    switchMap((opname) => getOperation(opname)),
    map((op) => op[0])
  );
}

export function handleOperandInput(
  inputField: HTMLInputElement,
  opNumber: number
): Observable<Operand> {
  return fromEvent(inputField, "input").pipe(
    debounceTime(1000),
    map((event: InputEvent) =>
      (<HTMLInputElement>event.target).value.toUpperCase()
    ),
    switchMap((regName) => getRegistry(regName)),
    map((registries) => {
      return {
        index: opNumber,
        value: registries[0],
      };
    })
  );
}

export function handleAddInstructionClick(
  addButton: HTMLButtonElement,
  operation: Observable<Operation>,
  op1: Observable<Operand>,
  op2: Observable<Operand>
) {
  return fromEvent(addButton, "click").pipe(
    map((ev) => "Simulate Click"),
    switchMap(() => combineLatest([operation, op1, op2]))
  );
}

export function handleSimulateClick(simulateButton: HTMLButtonElement) {
  return fromEvent(simulateButton, "click").pipe(map((ev) => "Simulate Click"));
}

export function emitCycles(instruction: Instruction) {
  const cycles: Cycle[] = [];
  cycles.push({ index: 1, unit: "IF" });
  cycles.push({ index: 2, unit: "ID" });
  for (let i = 3; i < instruction.operation.cycles + 3; i++) {
    cycles.push({ index: i, unit: "EXE" });
  }
  cycles.push({ index: instruction.operation.cycles + 3, unit: "MEM" });
  cycles.push({ index: instruction.operation.cycles + 4, unit: "WB" });
  cycles.push({ index: instruction.operation.cycles + 5, unit: "END" });

  return from(cycles).pipe(concatMap((cyc) => of(cyc).pipe(delay(1000))));
}
