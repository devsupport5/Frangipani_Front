import { Currency } from './crude/currency';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { CurrencyService } from './crude/currency.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  templateUrl: 'add.component.html'
})
export class AddComponent implements OnInit  {

  id: number;
  currency: Currency = new Currency();
  submitted = false;

  currencyNameError: any = 0;
  currencyNameMsg: any = '';
  currencySymbolError: any = 0;
  currencySymbolMsg: any = '';
  title: string;

  constructor(private ngxLoader: NgxUiLoaderService,private route: ActivatedRoute,private currencyService: CurrencyService,
    private router: Router) { }
   

  ngOnInit() {
    this.ngxLoader.start();
    if(localStorage.getItem("userName")=="" || localStorage.getItem("userName")==null){
      this.router.navigate(['/login']);
    }
    this.currency = new Currency();
    this.id = this.route.snapshot.params['id'];
    if(this.id==undefined){
      this.title = "Add";
    }else{
      this.title = "Update";
    }
    if(this.id!=undefined){
    this.currencyService.getCurrency(this.id)
      .subscribe(data => {
        console.log(data)
        this.currency = data;
        this.ngxLoader.stop();
      }, error => console.log(error));
    }else{
      this.ngxLoader.stop();
    }
  }

  newCategory(): void {
    this.submitted = false;
    this.currency = new Currency();
  }

  setFlags(){
    this.currencyNameError = 0;
    this.currencySymbolError = 0;
  }

  save() {
    this.currencyService.createCurrency(this.currency)
      .subscribe(data => {
        console.log(data)
        if(data!=null)
          this.gotoList();
      }, error => console.log(error));
    this.currency = new Currency();
    //this.gotoList();
  }

  onSubmit() {
    //this.submitted = true;
    //this.save();    
    if(!this.currency.currencyName){
      this.currencyNameError = 1;
      this.currencyNameMsg = "Currency Name cannot be empty";
      console.log("inside if");
      document.getElementById("currencyName").focus();
    }else if(!this.currency.currencySymbol){
      this.currencySymbolError = 1;
      this.currencySymbolMsg = "Currency symbol cannot be empty";
      console.log("inside if");
      document.getElementById("currencySymbol").focus();
    }else{
      console.log("Form submitted successfully");
      this.submitted = true;
      this.save(); 
      }  
  }

  gotoList() {
    this.router.navigate(['/currency']);
  }
 
 
}
