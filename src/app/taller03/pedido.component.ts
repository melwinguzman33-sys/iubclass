import { Component, signal, computed } from '@angular/core';
import { TarjetaProducto } from './tarjeta-producto.component';
import { ResumenPedido } from './resumen-pedido.component';

interface Producto { nombre: string; precio: number; existencias: number; }
interface Linea { nombre: string; precio: number; cantidad: number; }

@Component({
  selector: 'app-pedido',
  imports: [TarjetaProducto, ResumenPedido],
  template: `
    <h2>Realizar Pedido</h2>
    <div style="display: flex;">
      <!-- Zona de Productos -->
      <div>
        @for (prod of productos; track prod.nombre) {
          <app-tarjeta-producto
            [producto]="prod"
            [enPedido]="unidadesPorProducto()[prod.nombre] || 0"
            (agregar)="agregar($event)"
          />
        }
      </div>

      <!-- Zona del Resumen -->
      <div>
        <app-resumen-pedido
          [lineas]="pedido()"
          (quitar)="quitar($event)"
        />
      </div>
    </div>
  `
})
export class Pedido {
  // Datos iniciales exactos de la Tabla 1
  productos: Producto[] = [
    { nombre: 'Mango', precio: 1800, existencias: 3 },
    { nombre: 'Aguacate', precio: 4500, existencias: 2 },
    { nombre: 'Limón', precio: 650, existencias: 10 },
    { nombre: 'Queso costeño', precio: 12000, existencias: 1 }
  ];

  // El estado principal (único componente que modifica esta signal)
  pedido = signal<Linea[]>([]);

  // Computed que crea un diccionario para buscar rápido cuántos hay de un producto en el pedido
  unidadesPorProducto = computed(() => {
    const conteo: Record<string, number> = {};
    for (const linea of this.pedido()) {
      conteo[linea.nombre] = linea.cantidad;
    }
    return conteo;
  });

  // Métodos que usan update() devolviendo arreglos nuevos (Sin mutar el anterior)
  agregar(nombre: string) {
    const productoBase = this.productos.find(p => p.nombre === nombre);
    if (!productoBase) return;

    this.pedido.update(lineasActuales => {
      const lineaExistente = lineasActuales.find(l => l.nombre === nombre);
      
      if (lineaExistente) {
        // Si ya existe, construimos un arreglo nuevo actualizando la cantidad
        return lineasActuales.map(l => 
          l.nombre === nombre ? { ...l, cantidad: l.cantidad + 1 } : l
        );
      } else {
        // Si no existe, agregamos la línea nueva
        return [...lineasActuales, { nombre: productoBase.nombre, precio: productoBase.precio, cantidad: 1 }];
      }
    });
  }

  quitar(nombre: string) {
    // Para quitar, simplemente filtramos dejando por fuera la línea que queremos eliminar
    this.pedido.update(lineasActuales => 
      lineasActuales.filter(l => l.nombre !== nombre)
    );
  }
}