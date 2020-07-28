import { Currency } from './crude/currency';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { CurrencyService } from './crude/currency.service';



@Component({
  templateUrl: 'add.component.html'
})
export class AddComponent implements OnInit  {

  id: number;
  currency: Currency = new Currency();
  submitted = false;

  constructor(private route: ActivatedRoute,private currencyService: CurrencyService,
    private router: Router) { }
   

  ngOnInit() {
    this.currency = new Currency();
    this.id = this.route.snapshot.params['id'];
    this.currencyService.getCurrency(this.id)
      .subscribe(data => {
        console.log(data)
        this.currency = data;
      }, error => console.log(error));

  }

  newCategory(): void {
    this.submitted = false;
    this.currency = new Currency();
  }

  save() {
    this.currencyService.createCurrency(this.currency)
      .subscribe(data => console.log(data), error => console.log(error));
    this.currency = new Currency();
    this.gotoList();
  }

  onSubmit() {
    this.submitted = true;
    this.save();    
  }

  gotoList() {
    this.router.navigate(['/currency']);
  }
 
 
}
