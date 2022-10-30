import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  constructor(
    private readonly httpClient: HttpClient,
  ) { }

  createSchedule(data: any, token: any): Observable<any> {
    let httpOptions = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
        'Content-type': 'application/json; charset=UTF-8',
      }),
    }

    return this.httpClient.post(`${environment.api}/schedule/new`, data, httpOptions);
  }

  bulkCreateSchedule(data: any, token: any): Observable<any> {
    let httpOptions = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
        'Content-type': 'application/json; charset=UTF-8',
      }),
    }

    return this.httpClient.post(`${environment.api}/schedule/bulk`, data, httpOptions);
  }

  getSchedule(params: any, token: any): Observable<any> {
    let httpOptions = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
        'Content-type': 'application/json; charset=UTF-8',
      }),
      params: params
    }
    
    return this.httpClient.get(`${environment.api}/schedule`, httpOptions)
  }

  updateSchedule(id: any, data: any, token: any): Observable<any> {
    let httpOptions = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
        'Content-type': 'application/json; charset=UTF-8',
      }),
    }

    return this.httpClient.put(`${environment.api}/schedule/edit/` + id, data, httpOptions);
  }

  createCart(data: any, token: any): Observable<any> {
    let httpOptions = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
        'Content-type': 'application/json; charset=UTF-8',
      }),
    }

    return this.httpClient.post(`${environment.api}/cart/new`, data, httpOptions);
  }

  updateCart(id: number, data: any, token: any): Observable<any> {
    let httpOptions = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
        'Content-type': 'application/json; charset=UTF-8',
      }),
    }

    return this.httpClient.put(`${environment.api}/cart/edit/` + id, data, httpOptions);
  }

  getCart(params: any, token: any): Observable<any> {
    let httpOptions = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
        'Content-type': 'application/json; charset=UTF-8',
      }),
      params: params
    }
    
    return this.httpClient.get(`${environment.api}/cart`, httpOptions)
  }

  deleteCart(id: number, token: any): Observable<any> {
    let httpOptions = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
        'Content-type': 'application/json; charset=UTF-8',
      }),
    }

    return this.httpClient.delete(`${environment.api}/cart/` + id, httpOptions)
  }

  createReservation(data: any, token: any): Observable<any> {
    let httpOptions = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
        'Content-type': 'application/json; charset=UTF-8',
      }),
    }

    return this.httpClient.post(`${environment.api}/reservation/new`, data, httpOptions);
  }

  getReservation(params: any, token: any): Observable<any> {
    let httpOptions = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
        'Content-type': 'application/json; charset=UTF-8',
      }),
      params: params
    }
    
    return this.httpClient.get(`${environment.api}/reservation`, httpOptions)
  }

  getPayment(params: any, token: any): Observable<any> {
    let httpOptions = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
        'Content-type': 'application/json; charset=UTF-8',
      }),
      params: params
    }
    
    return this.httpClient.get(`${environment.api}/payment`, httpOptions)
  }
}
