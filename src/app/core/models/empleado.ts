export class Empleado {
  constructor(
    public idEmpleado: number | null = null,
    public dni: string | null = null,
    public nombres: string | null = null,
    public telefono: string | null = null,
    public estado: string | null = null,
    public user: string | null = null
  ) {}
}
