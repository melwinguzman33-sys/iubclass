import { Component, input, output, computed } from '@angular/core';
import { CurrencyPipe } from '@angular/common';

interface Linea { nombre: string; precio: number; cantidad: number; }

@Component({
  selector: 'app-resumen-pedido',
  imports: [CurrencyPipe],
  template: `
    <div style="border: 2px solid #000; padding: 15px; margin: 10px; width: 300px;">
      <h3>Resumen del Pedido</h3>
      
      <ul>
        <!-- @for con track y @empty -->
        @for (linea of lineas(); track linea.nombre) {
          <li>
            {{ linea.nombre }} x{{ linea.cantidad }} - {{ linea.precio * linea.cantidad | currency:'COP':'symbol':'1.0-0' }}
            <button (click)="quitar.emit(linea.nombre)">Quitar</button>
          </li>
        } @empty {
          <p>El pedido está vacío</p>
        }
      </ul>
      <hr>
      <p>Subtotal: {{ subtotal() | currency:'COP':'symbol':'1.0-0' }}</p>
      
      <!-- Mostrar "Gratis" si aplica la regla o $ 0 si no hay pedido -->
      <p>Domicilio: 
        @if (subtotal() === 0) {
          {{ 0 | currency:'COP':'symbol':'1.0-0' }}
        } @else if (domicilio() === 0) {
          Gratis
        } @else {
          {{ domicilio() | currency:'COP':'symbol':'1.0-0' }}
        }
      </p>
      
      <p><strong>Total: {{ total() | currency:'COP':'symbol':'1.0-0' }}</strong></p>
    </div>
  `
})
export class ResumenPedido {
  // input obligatorio
  lineas = input.required<Linea[]>();
  
  // output para quitar líneas
  quitar = output<string>();

  // Reglas de negocio en computeds
  subtotal = computed(() => 
    this.lineas().reduce((suma, l) => suma + (l.precio * l.cantidad), 0)
  );

  domicilio = computed(() => {
    const sub = this.subtotal();
    if (sub === 0) return 0; // Pedido vacío no cobra domicilio
    if (sub < 20000) return 3000; // Menor a 20.000 cobra 3.000
    return 0; // Desde 20.000 es gratis
  });

  total = computed(() => this.subtotal() + this.domicilio());
}