import { Cliente } from "./cliente";
import { Empleado } from "./empleado";

export class Venta {
  constructor(
    public idVenta: number | null = null,
    public cliente: Cliente | null = null,
    public empleado: Empleado | null = null,
    public numeroSerie: string | null = null,
    public fechaVentas: Date | null = null,
    public monto: number | null = null,
    public estado: string | null = null
  ) {}
}
