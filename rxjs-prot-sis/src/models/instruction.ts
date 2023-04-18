import { Operand } from "./operand";
import { Operation } from "./operation";

export interface Instruction {
  index: number;
  operation: Operation;
  op1: Operand;
  op2: Operand;
}
