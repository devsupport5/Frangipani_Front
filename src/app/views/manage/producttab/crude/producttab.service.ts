import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductTabService {


  private baseUrl = environment.APIBaseURL + "producttab/producttabs";
  private productUrl = environment.APIBaseURL + "product/products";
  //private baseUrl = 'http://localhost:8080/springboot-crud-rest/api/producttab/producttabs';
  //private productUrl = 'http://localhost:8080/springboot-crud-rest/api/product/products';
   
  constructor(private http: HttpClient) { }

  getProductTab(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  createProductTab(Product: Object): Observable<Object> {
    return this.http.post(`${this.baseUrl}`, Product);
  }

  updateProductTab(id: number, value: any): Observable<Object> {
    return this.http.put(`${this.baseUrl}/${id}`, value);
  }

  updateProductStatus(id: number ,value: any) {    
    this.http.put(this.baseUrl+"/"+id, value).subscribe(data => {
      console.log(data);
    },
    error => {
      console.log('Log the error here: ', error);
      });    
  }

  getProduct(): Observable<any> {
    return this.http.get(`${this.productUrl}/activeList`);
  }
   

  deleteProductTab(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`, { responseType: 'text' });
  }

  getProductTabList(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/list/${id}`);
  }
}
