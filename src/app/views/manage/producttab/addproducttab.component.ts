import { ProductTab } from './crude/producttab';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { ProductTabService } from './crude/producttab.service';
import { Product } from "../product/crude/product";
import { Observable } from "rxjs";


@Component({
  templateUrl: 'addproducttab.component.html'
})
export class AddProductComponent  implements OnInit  {

  id: number;
  productTab: ProductTab = new ProductTab();
  submitted = false;
  products: Observable<Product[]>;
  

  constructor(private route: ActivatedRoute,private productTabService: ProductTabService,
    private router: Router) { }

   reloadData() {
     this.products = this.productTabService.getProduct();
  }
    
  ngOnInit() {
    this.reloadData();
    this.productTab = new ProductTab();
    this.id = this.route.snapshot.params['id'];
    this.productTabService.getProductTab(this.id)
      .subscribe(data => {
        console.log("call-----------"+data);
        this.productTab = data;
      }, error => console.log(error));
      
      
  }

   
  save() {
    this.productTabService.createProductTab(this.productTab)
      .subscribe(data => console.log(data), error => console.log(error));
    this.productTab = new ProductTab();
    this.gotoList();
  }

  onSubmit() {
    this.submitted = true;
    this.save();    
  }

  gotoList() {
    this.router.navigate(['/producttab']);
  }
 
}
