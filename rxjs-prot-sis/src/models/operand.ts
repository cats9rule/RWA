import { Registry } from "./registry";

export interface Operand {
  index: number;
  isImmediate: boolean;
  value: Registry | number;
}
