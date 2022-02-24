import { Producto } from "./producto";

export class NuevaVenta {
  constructor(
    public id: number | null = null,
    public idCliente: number | null = null,
    public idEmpleado: number | null = null,
    public idProducto: Producto | null = null,
    public numeroSerie: string | null = null,
    public descriptionP: string | null = null,
    public fecha: string | null = null,
    public precio: number | null = null,
    public cantidad: number | null = null,
    public subtotal: number | null = null,
    public monto: number | null = null,
    public estado: string | null = null
  ) {}
}
