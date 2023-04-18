import { SystemLogic } from "./observables/systemLogic";
import { drawInit } from "./view/initialView";

console.log("Hello RxJS!");

drawInit(document.body);
const logic = new SystemLogic();
