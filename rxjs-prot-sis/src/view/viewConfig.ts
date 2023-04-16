export interface Input {
  name: string;
  type: string;
  id: string;
  value: string;
}

export interface Unit {
  name: string;
}

export const inputs: Input[] = [
  {
    name: "Instruction",
    type: "",
    id: "instruction",
    value: "",
  },
  {
    name: "Operand-1",
    type: "",
    id: "op1",
    value: "",
  },
  {
    name: "Operand-2",
    type: "",
    id: "op2",
    value: "",
  },
];

export const units: Unit[] = [
  {
    name: "IF",
  },
  {
    name: "ID",
  },
  {
    name: "EXE",
  },
  {
    name: "MEM",
  },
  {
    name: "WB",
  },
];
