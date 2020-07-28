import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {

  private baseUrl = 'http://localhost:8080/springboot-crud-rest/api/currency/currencys';

  constructor(private http: HttpClient) { }

  getCurrency(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  createCurrency(Currency: Object): Observable<Object> {
    return this.http.post(`${this.baseUrl}`, Currency);
  }

  updateCurrency(id: number, value: any): Observable<Object> {
    return this.http.put(`${this.baseUrl}/${id}`, value);
  }

  updateCurrencyStatus(id: number ,value: any) {    
    this.http.put(this.baseUrl+"/"+id, value).subscribe(data => {
      console.log(data);
    },
  error => {
    console.log('Log the error here: ', error);
    });    
  }

  deleteCurrency(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`, { responseType: 'text' });
  }

  getCurrencyList(): Observable<any> {
    return this.http.get(`${this.baseUrl}`);
  }
}
