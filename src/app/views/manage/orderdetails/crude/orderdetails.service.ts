import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { OrderDetails } from './orderdetails';


@Injectable({
  providedIn: 'root'
})
export class OrderService {

  //private serverUrl = environment.baseUrl;
  
  

  private baseUrl = environment.APIBaseURL + "order/orders"; //'http://localhost:8080/springboot-crud-rest/api/cat/categorys';
  //private baseUrlstatus = environment.APIBaseURL  = "cat/categorys/status";// 'http://localhost:8080/springboot-crud-rest/api/cat/categorys/status';

  constructor(private http: HttpClient) { }

  
  
  getOrder(id: number): Observable<any> {    
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  createOrder(Order: Object): Observable<Object> {
    return this.http.post(`${this.baseUrl}`, Order);
  }

  updateOrder(id: number, value: any): Observable<Object> {
    return this.http.put(`${this.baseUrl}/${id}`, value);
  }

  updateOrderStatus(id: number ,value: any) {    
    this.http.put(this.baseUrl+"/"+id, value).subscribe(data => {
      console.log(data);
    },
  error => {
    console.log('Log the error here: ', error);
    });    
  }

  deleteOrder(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`, { responseType: 'text' });
  }

  getOrdersList(id: number): Observable<any> {
    console.log("Base url"+this.baseUrl+"/"+id);
    return this.http.get<OrderDetails>(`${this.baseUrl}/${id}`); 
  }
}
