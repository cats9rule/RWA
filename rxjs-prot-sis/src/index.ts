import { Registry } from "./models/registry";
import { getRegistry } from "./observers/apiService";
import { drawInit } from "./view/initialView";

console.log("Hello RxJS!");

drawInit(document.body);
getRegistry(0).subscribe({
  next: (reg: Registry) => console.log(reg),
});
