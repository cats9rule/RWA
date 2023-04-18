import {
  Observable,
  debounceTime,
  filter,
  from,
  fromEvent,
  map,
  switchMap,
} from "rxjs";
import { getOperation, getRegistry } from "./apiService";
import { Operation } from "../models/operation";
import { Operand } from "../models/operand";

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
  const input = parseInt(inputField.value);
  if (isNaN(input)) {
    return fromEvent(inputField, "input").pipe(
      debounceTime(500),
      map((event: InputEvent) =>
        (<HTMLInputElement>event.target).value.toUpperCase()
      ),
      switchMap((regName) => getRegistry(regName)),
      map((registries) => ({
        index: opNumber,
        isImmediate: false,
        value: registries[0],
      }))
    );
  } else {
    return fromEvent(inputField, "input").pipe(
      debounceTime(1000),
      map((event: InputEvent) => {
        const value = parseInt((<HTMLInputElement>event.target).value);
        return { index: opNumber, isImmediate: false, value: value };
      })
    );
  }
}

export function handleAddInstructionClick(addButton: HTMLButtonElement) {
  return fromEvent(addButton, "click").pipe(
    map((ev) => "AddInstruction Click")
  );
}

export function handleSimulateClick(simulateButton: HTMLButtonElement) {
  return fromEvent(simulateButton, "click").pipe(map((ev) => "Simulate Click"));
}
