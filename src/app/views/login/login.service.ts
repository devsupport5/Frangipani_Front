import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  //private serverUrl = environment.baseUrl;
  
  

  private baseUrl = environment.APIBaseURL + "admin/checkAdmin"; //'http://localhost:8080/springboot-crud-rest/api/cat/categorys';
  //private baseUrlstatus = environment.APIBaseURL  = "cat/categorys/status";// 'http://localhost:8080/springboot-crud-rest/api/cat/categorys/status';

  constructor(private http: HttpClient) { }
  async checkAdmin(userName: string,password: string,value: any): Promise<any> {

//console.log(this.baseUrl +"--"+userName+"--"+password)

this.http.put(this.baseUrl+"/"+userName+"/"+password, value).subscribe(data => {
  console.log("Data -----------"+data);
  return data;
},
error => {
console.log('Log the error here: ', error);
}); 

  //      return this.http.get(`${this.baseUrl}/${userName}/${password}`);
  }
 
}
