import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SubcategoryService {

  private baseUrl = 'http://localhost:8080/springboot-crud-rest/api/cat/categorys';
  private subCategory = 'http://localhost:8080/springboot-crud-rest/api/cat/subcategorys';
  

  constructor(private http: HttpClient) { }

  getCategory(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  createCategory(Subcategory: Object): Observable<Object> {
    return this.http.post(`${this.baseUrl}`, Subcategory);
  }

  updateCategory(id: number, value: any): Observable<Object> {
    return this.http.put(`${this.baseUrl}/${id}`, value);
  }

  updateCategoryStatus(id: number ,value: any) {    
    this.http.put(this.baseUrl+"/"+id, value).subscribe(data => {
      console.log(data);
    },
    error => {
      console.log('Log the error here: ', error);
    });    
  }

  deleteCategory(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`, { responseType: 'text' });
  }

  getCategorysList(): Observable<any> {
    return this.http.get(`${this.baseUrl}`);
  }

  getSubCategorys(id: number): Observable<any> {    
    return this.http.get(`${this.subCategory}/${id}`);
  }

}
