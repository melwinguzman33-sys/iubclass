import { Component, input, output, computed } from '@angular/core';
import { CurrencyPipe } from '@angular/common';

// Interfaces basadas en la guía del taller
interface Producto { nombre: string; precio: number; existencias: number; }

@Component({
  selector: 'app-tarjeta-producto',
  imports: [CurrencyPipe],
  template: `
    <div style="border: 1px solid #ccc; padding: 10px; margin: 10px; width: 200px;">
      <h3>{{ producto().nombre }}</h3>
      <p>Precio: {{ producto().precio | currency:'COP':'symbol':'1.0-0' }}</p>
      
      <!-- Se muestran los disponibles usando el computed -->
      <p>Disponibles: {{ disponibles() }}</p>
      
      <!-- El botón se deshabilita si disponibles llega a 0 -->
      <button 
        (click)="agregar.emit(producto().nombre)" 
        [disabled]="disponibles() === 0">
        Agregar
      </button>
    </div>
  `
})
export class TarjetaProducto {
  // input obligatorio y opcional con valor por defecto
  producto = input.required<Producto>();
  enPedido = input<number>(0);
  
  // output para avisar al padre
  agregar = output<string>();

  // computed para calcular los disponibles
  disponibles = computed(() => this.producto().existencias - this.enPedido());
}