import { Component, computed, input, output } from '@angular/core';
import { CurrencyPipe } from '@angular/common';

export interface Producto {
  nombre: string;
  precio: number;
  existencias: number;
}

@Component({
  selector: 'app-ficha',
  imports: [CurrencyPipe],
  template: `
    <div>
      <strong>{{ producto().nombre }}</strong>
      <span> · Precio: {{ producto().precio | currency:'COP':'symbol-narrow':'1.0-0' }}</span>
      <span> · Existencias: {{ producto().existencias }}</span>
      <span> · </span>
      @switch (estado()) {
        @case ('Agotado') { <span>Agotado</span> }
        @case ('Inventario bajo') { <span>Inventario bajo</span> }
        @case ('Disponible') { <span>Disponible</span> }
      }
      <button
        style="margin-left: 8px; padding: 2px 8px; border: 1px solid #888; cursor: pointer;"
        [disabled]="producto().existencias === 0"
        (click)="retirar.emit(producto().nombre)">
        Retirar 1
      </button>
    </div>
  `,
})
export class FichaProducto {
  producto = input.required<Producto>();
  retirar = output<string>();

  estado = computed(() => {
    const e = this.producto().existencias;
    if (e === 0) return 'Agotado';
    if (e < 3) return 'Inventario bajo';
    return 'Disponible';
  });
}