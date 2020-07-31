import { Component,OnInit } from '@angular/core';
import { Observable } from "rxjs";
import { ProductTabService } from "./crude/producttab.service";
import { ProductTab } from "./crude/producttab";
import { Product } from "../product/crude/product";
import { Router } from '@angular/router';


@Component({
  templateUrl: 'producttab.component.html'
})
export class ProductComponent  implements OnInit {

  
  categorys: Observable<ProductTab[]>;
  producttabs: Observable<ProductTab[]>;
  product: ProductTab = new ProductTab();
  products: Observable<Product[]>;
  

  constructor(private productTabService: ProductTabService,
    private router: Router) {}

  ngOnInit() {
    this.reloadData();
  }
 
  reloadData() {
    this.products = this.productTabService.getProduct();
  }

  onOptionsSelected(value:number){
    console.log("the selected value is " + value);
    this.producttabs = this.productTabService.getProductTabList(value);
}

  deleteProduct(id: number) {
    this.productTabService.deleteProductTab(id)
      .subscribe(
        data => {
          console.log(data);
          this.reloadData();
        },
        error => console.log(error));
  }

  updateProductStatus(id: number){ 
    this.productTabService.getProductTab(id).subscribe(data => {
    this.product = data;

     if(this.product.isActive==0)
       this.product.isActive = 1;
     else
       this.product.isActive = 0;
        
       this.product.id = id;
      this.productTabService.updateProductStatus(id,this.product);
   }, error => console.log(error));
 }

  
  productDetails(id: number){
    this.router.navigate(['details', id]);
  }

  updateProduct(id: number){
    this.router.navigate(['producttab/update', id]);
  }
}
