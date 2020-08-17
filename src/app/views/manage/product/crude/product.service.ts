import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private baseUrl = environment.APIBaseURL + "product/products";
  private categoryUrl = environment.APIBaseURL + "cat/categorys";
  private subCategory = environment.APIBaseURL + "cat/subcategorys";
  private currencysUrl = environment.APIBaseURL + "currency/currencys";
  private authorsUrl = environment.APIBaseURL + "auth/authors";

  //private baseUrl = 'http://localhost:8080/springboot-crud-rest/api/product/products';
  //private categoryUrl = 'http://localhost:8080/springboot-crud-rest/api/cat/categorys';
  //private subCategory = 'http://localhost:8080/springboot-crud-rest/api/cat/subcategorys';
  //private currencysUrl = 'http://localhost:8080/springboot-crud-rest/api/currency/currencys';
  //private authorsUrl = 'http://localhost:8080/springboot-crud-rest/api/auth/authors';

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
    console.log(this.baseUrl+"/productsList");
    return this.http.get(`${this.baseUrl}/productsList`);
  }

  getCategorys(): Observable<any> {    
    return this.http.get(`${this.categoryUrl}/categoryActiveList`);
  }

  getSubCategorys(id: number): Observable<any> {    
    return this.http.get(`${this.subCategory}/${id}`);
  }

  getCurrencys(): Observable<any> {    
    return this.http.get(`${this.currencysUrl}/activeList`);
  }

  getAuthors(): Observable<any> {    
    return this.http.get(`${this.authorsUrl}/activeList`);
  }

}
