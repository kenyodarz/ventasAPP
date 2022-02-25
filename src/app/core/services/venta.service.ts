// Angular
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// Servicio Generico
import { CommonService } from './common.service';
// Variable de Entorno
import { API_URL } from 'src/environments/environment';
// Modelo
import { Venta } from 'src/app/core/models/venta';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class VentaService extends CommonService<Venta, number> {
  protected override URL_API: string = `${API_URL}/ventas`;
  constructor(protected override http: HttpClient) {
    super(http);
  }

  obtenerSerie(): Observable<any> {
    return this.http.get<any>(`${this.URL_API}/serie`);
  }
}
