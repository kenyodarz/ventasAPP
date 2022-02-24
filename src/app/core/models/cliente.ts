export class Cliente {
  constructor(
    public idCliente: number | null = null,
    public dni: string | null = null,
    public nombres: string | null = null,
    public direccion: string | null = null,
    public estado: string | null = null
  ) {}
}
