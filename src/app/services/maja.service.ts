import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MajaService {

  constructor(
    private readonly httpClient: HttpClient,
  ) { }

  getToken(): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-type': 'application/x-www-form-urlencoded'
      }),
    }
    const data = new URLSearchParams({
      grant_type: 'password',
      client_id: environment.client_id,
      client_secret: environment.client_secret,
      username: environment.username,
      password: environment.password
    }).toString();

    return this.httpClient.post(`${environment.token_URL}`, data, httpOptions)
  }

  createInvoice(data: any, token: any): Observable<any> {
    let httpOptions = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
        'Content-type': 'application/json; charset=UTF-8',
      }),
    }
    return this.httpClient.post(`${environment.maja_api}/register`, data, httpOptions)
  }
}
