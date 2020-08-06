import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';


@Component({
  selector: 'app-dashboard',
  templateUrl: 'login.component.html'
})
export class LoginComponent implements OnInit  { 

  constructor(private router: Router){}


  ngOnInit() {  }

  onSubmit() {
    console.log("test")
     this.gotoList();    
  }

  gotoList() {
    this.router.navigate(['/category']);
  }


}
