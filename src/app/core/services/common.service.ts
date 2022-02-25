import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CommonService<E, ID> {
  protected URL_API: string | undefined;
  constructor(protected http: HttpClient) {}

  getAll(): Observable<E[]> {
    return this.http.get<E[]>(`${this.URL_API}/all`);
  }

  getOne(id: ID): Observable<E> {
    return this.http.get<E>(`${this.URL_API}/${id}`);
  }

  save(entity: E): Observable<E> {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');
    return this.http.post<E>(`${this.URL_API}/save`, JSON.stringify(entity), {
      headers: headers,
    });
  }

  delete(id: ID): Observable<E> {
    return this.http.get<E>(`${this.URL_API}/delete/${id}`);
  }
}
