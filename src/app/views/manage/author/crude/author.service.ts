import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthorService {

  private baseUrl = 'http://localhost:8080/springboot-crud-rest/api/auth/authors';

  constructor(private http: HttpClient) { }

  getAuthor(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  createAuthor(Author: Object): Observable<Object> {
    return this.http.post(`${this.baseUrl}`, Author);
  }

  updateAuthor(id: number, value: any): Observable<Object> {
    return this.http.put(`${this.baseUrl}/${id}`, value);
  }

  updateAuthorStatus(id: number ,value: any) {    
    this.http.put(this.baseUrl+"/"+id, value).subscribe(data => {
      console.log(data);
    },
  error => {
    console.log('Log the error here: ', error);
    });    
  }

  deleteAuthor(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`, { responseType: 'text' });
  }

  getAuthorList(): Observable<any> {
    return this.http.get(`${this.baseUrl}`);
  }
}
