import { Producto } from "./producto";
import { Venta } from "./venta";

export class DetalleVenta {
  constructor(
    public idDetalleVenta: number | null = null,
    public venta: Venta | null = null,
    public producto: Producto | null = null,
    public cantidad: number | null = null,
    public precioVenta: number | null = null
  ) {}
}