import { Routes } from "@angular/router";
import { Tablero } from "./tablero/tablero";
import { Acerca } from "./acerca/acerca";
import { Inventario } from "./inventario";
import { Pedido } from "./taller03/pedido.component";

export const routes: Routes = [
  { path: "", redirectTo: "tablero", pathMatch: "full" },
  { path: "tablero", component: Tablero },
  { path: "acerca", component: Acerca },
  { path: "inventario", component: Inventario },
  { path: "taller03", component: Pedido }, 
  { path: "**", redirectTo: "tablero" }
];