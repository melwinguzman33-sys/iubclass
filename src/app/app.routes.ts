import { Routes } from "@angular/router";
import { Tablero } from "./tablero/tablero";
import { Acerca } from "./acerca/acerca";
import { Inventario } from "./inventario";

// El mapa de rutas de la aplicación: qué componente se muestra en cada URL.
// Esto se ve completo en la S09. Hoy solo dejamos el esqueleto para que la
// aplicación tenga dónde crecer: dos vistas y una redirección.
export const routes: Routes = [
  { path: "", redirectTo: "tablero", pathMatch: "full" },
  { path: "tablero", component: Tablero },
  { path: "acerca", component: Acerca },
  { path: "inventario", component: Inventario },
  { path: "**", redirectTo: "tablero" }, // cualquier otra URL vuelve al tablero
];
