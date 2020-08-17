import { Component,OnInit } from '@angular/core';
import { Observable } from "rxjs";
import { CurrencyService } from "./crude/currency.service";
import { Currency } from "./crude/currency";
import { Router } from '@angular/router';
import { environment } from '../../../../environments/environment';

@Component({
  templateUrl: 'currency.component.html'
})
export class CurrencyComponent implements OnInit {

  
  currencys: Observable<Currency[]>;
  currency : Currency = new Currency();
  projectName : string;

  constructor(private currencyService: CurrencyService,
    private router: Router) {}

  ngOnInit() {
    this.projectName = environment.ProjectName;
    if(localStorage.getItem("userName")=="" || localStorage.getItem("userName")==null){
      this.router.navigate(['/login']);
    }
    this.reloadData();
  }

  reloadData() {
    this.currencys = this.currencyService.getCurrencyList();
  }

  deleteCurrency(id: number) {
    if(confirm("Are you sure to delete ")) {
       this.currencyService.deleteCurrency(id)
      .subscribe(
        data => {
          console.log(data);
          this.reloadData();
        },
        error => console.log(error));
      }
  }

  updateCurrencyStatus(id: number){ 
    this.currencyService.getCurrency(id).subscribe(data => {
    this.currency = data;

     if(this.currency.isActive==0)
       this.currency.isActive = 1;
     else
       this.currency.isActive = 0;
        
       this.currency.id = id;
      this.currencyService.updateCurrencyStatus(id,this.currency);
   }, error => console.log(error));
 }


  currencysDetails(id: number){
    this.router.navigate(['details', id]);
  }

  updateCurrency(id: number){
    this.router.navigate(['currency/update', id]);
  } 

}
