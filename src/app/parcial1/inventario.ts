import { Component, signal, computed } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { FichaProducto, Producto } from './ficha-producto';

@Component({
  selector: 'app-inventario',
  imports: [FichaProducto, CurrencyPipe],
  template: `
    <h2>Inventario</h2>
    <p>Valor total: {{ valorTotal() | currency:'COP':'symbol-narrow':'1.0-0' }}</p>
    <p>Unidades: {{ unidades() }}</p>
    <p>Agotados: {{ agotados() }}</p>

    <button
      style="margin-bottom: 8px; padding: 2px 8px; border: 1px solid #888; cursor: pointer;"
      (click)="vaciar()">
      Vaciar lista
    </button>

    @for (p of productos(); track p.nombre) {
      <app-ficha [producto]="p" (retirar)="retirar($event)" />
    } @empty {
      <p>No hay productos para mostrar</p>
    }
  `,
})
export class Inventario {
  productos = signal<Producto[]>([
    { nombre: 'Teclado', precio: 38000, existencias: 6 },
    { nombre: 'Ratón', precio: 22000, existencias: 0 },
    { nombre: 'Cable HDMI', precio: 15000, existencias: 2 },
    { nombre: 'Cable de red', precio: 6500, existencias: 12 },
  ]);

  valorTotal = computed(() =>
    this.productos().reduce((suma, p) => suma + p.precio * p.existencias, 0)
  );

  unidades = computed(() =>
    this.productos().reduce((suma, p) => suma + p.existencias, 0)
  );

  agotados = computed(() =>
    this.productos().filter(p => p.existencias === 0).length
  );

  retirar(nombre: string) {
    this.productos.update(lista =>
      lista.map(p =>
        p.nombre === nombre && p.existencias > 0
          ? { ...p, existencias: p.existencias - 1 }
          : p
      )
    );
  }

  vaciar() {
    this.productos.update(() => []);
  }
}