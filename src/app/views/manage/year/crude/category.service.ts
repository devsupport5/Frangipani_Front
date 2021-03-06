import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { Category } from './category';


@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  //private serverUrl = environment.baseUrl;
  
  

  private baseUrl = environment.APIBaseURL + "cat/categorys"; //'http://localhost:8080/springboot-crud-rest/api/cat/categorys';
  //private baseUrlstatus = environment.APIBaseURL  = "cat/categorys/status";// 'http://localhost:8080/springboot-crud-rest/api/cat/categorys/status';

  constructor(private http: HttpClient) { }

  
  
  getCategory(id: number): Observable<any> {
    
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  createCategory(Category: Object): Observable<Object> {
    return this.http.post(`${this.baseUrl}`, Category);
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
    console.log("Base url"+this.baseUrl+"/categoryList");
    return this.http.get<Category>(`${this.baseUrl}/categoryList`); 
  }
}
