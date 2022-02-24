export class Producto {
  constructor(
    public idProducto: number | null = null,
    public nombres: string | null = null,
    public precio: number | null = null,
    public stock: number | null = null,
    public estado: string | null = null
  ) {}
}
