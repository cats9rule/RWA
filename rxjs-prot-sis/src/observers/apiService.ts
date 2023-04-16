import { Observable, from } from "rxjs";
import { Registry } from "../models/registry";
import { Operation } from "../models/operation";

const BASE_URL = "http://localhost:3000";

export function getRegistry(id: number): Observable<Registry> {
  return from(
    fetch(`${BASE_URL}/registries/${id}`)
      .then((res) => {
        if (res.ok) {
          console.log(res);
          return res.json();
        } else throw new Error("Registry not found");
      })
      .catch((err) => console.log(err))
  );
}

export function putRegistry(registry: Registry): Observable<string> {
  return from(
    fetch(`${BASE_URL}/registries/${registry.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(registry),
    })
      .then((res) => {
        if (res.ok)
          return `Value of ${registry.name} updated to ${registry.value}`;
        else if (res.status == 404) throw new Error("Registry not found");
      })
      .catch((err) => {
        console.log(err);
        return "An error occured.";
      })
  );
}

export function getOperation(name: string): Observable<Operation> {
  return from(
    fetch(`${BASE_URL}/operation/?name=${name}`)
      .then((res) => {
        if (res.ok) return res.json();
        else throw new Error("Operation not found");
      })
      .catch((err) => console.log(err))
  );
}
