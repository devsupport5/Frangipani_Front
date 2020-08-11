import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { Login } from './login';
import { LoginService } from './login.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';



@Component({
  selector: 'app-dashboard',
  templateUrl: 'login.component.html'
})
export class LoginComponent implements OnInit  { 

  constructor(private router: Router,private loginService: LoginService,private http: HttpClient){}
  login : Login = new Login();


  userNameError: any = 0;
  userNameMsg: any = '';
  userPasswordError: any = 0;
  userPasswordMsg: any = '';
  private baseUrl = environment.APIBaseURL + "admin/checkAdmin"; //'http://localhost:8080/springboot-crud-rest/api/cat/categorys';


  ngOnInit() {  
    localStorage.setItem("userName","");
  }



  setFlags(){
    console.log("this is call resert")
    this.userNameError = 0;
    this.userPasswordError = 0;
  }

  onSubmit() {
    console.log("test" + this.login.userName)

    if(!this.login.userName){
      this.userNameError = 1;
      this.userNameMsg = "Please enter user name";
      console.log("inside if");
    }else if(!this.login.password){
      this.userPasswordError = 1;
      this.userPasswordMsg = "Please enter password";
      console.log("inside if");
    }else{

     
      this.http.put(this.baseUrl, this.login).subscribe(data => {
        console.log("Data -----------"+data);
        if(data==true){
              this.gotoList();   
              localStorage.setItem("userName",this.login.userName); 
        }else{
          this.userPasswordError = 1;
          this.userPasswordMsg = "Please enter valid username and password";
          localStorage.setItem("userName","");
        }
        

      },
      error => {
      console.log('Log the error here: ', error);
      }); 
      
        //      return this.http.get(`${this.baseUrl}/${userName}/${password}`);
        }     
    }

  

  gotoList() {
    this.router.navigate(['/category']);
  }


}
