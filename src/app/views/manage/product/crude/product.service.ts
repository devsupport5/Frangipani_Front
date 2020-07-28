import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private baseUrl = 'http://localhost:8080/springboot-crud-rest/api/product/products';
  private categoryUrl = 'http://localhost:8080/springboot-crud-rest/api/cat/categorys';
  private subCategory = 'http://localhost:8080/springboot-crud-rest/api/cat/subcategorys';
  private currencysUrl = 'http://localhost:8080/springboot-crud-rest/api/currency/currencys';
  private authorsUrl = 'http://localhost:8080/springboot-crud-rest/api/auth/authors';

  constructor(private http: HttpClient) { }

  getProduct(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  createProduct(Product: Object): Observable<Object> {
    return this.http.post(`${this.baseUrl}`, Product);
  }

  updateProduct(id: number, value: any): Observable<Object> {
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

  deleteProduct(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`, { responseType: 'text' });
  }

  getProductList(): Observable<any> {
    return this.http.get(`${this.baseUrl}`);
  }

  getCategorys(): Observable<any> {    
    return this.http.get(`${this.categoryUrl}`);
  }

  getSubCategorys(id: number): Observable<any> {    
    return this.http.get(`${this.subCategory}/${id}`);
  }

  getCurrencys(): Observable<any> {    
    return this.http.get(`${this.currencysUrl}`);
  }

  getAuthors(): Observable<any> {    
    return this.http.get(`${this.authorsUrl}`);
  }

}
