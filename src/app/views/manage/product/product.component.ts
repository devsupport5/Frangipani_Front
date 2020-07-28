import { Component,OnInit } from '@angular/core';
import { Observable } from "rxjs";
import { ProductService } from "./crude/product.service";
import { Product } from "./crude/product";
import { Router } from '@angular/router';


@Component({
  templateUrl: 'product.component.html'
})
export class ProductComponent  implements OnInit {

  
  categorys: Observable<Product[]>;
  products: Observable<Product[]>;
  product: Product = new Product();

  constructor(private productService: ProductService,
    private router: Router) {}

  ngOnInit() {
    this.reloadData();
  }

  reloadData() {
    this.products = this.productService.getProductList();
  }

  deleteProducts(id: number) {
    this.productService.deleteProduct(id)
      .subscribe(
        data => {
          console.log(data);
          this.reloadData();
        },
        error => console.log(error));
  }

  updateProductStatus(id: number){ 
    this.productService.getProduct(id).subscribe(data => {
    this.product = data;

     if(this.product.isActive==0)
       this.product.isActive = 1;
     else
       this.product.isActive = 0;
        
       this.product.id = id;
      this.productService.updateProductStatus(id,this.product);
   }, error => console.log(error));
 }

  onOptionsSelected(value:number){
    console.log("the selected value is " + value);
    this.products = this.productService.getSubCategorys(value);
  }


  productDetails(id: number){
    this.router.navigate(['details', id]);
  }

  updateProduct(id: number){
    this.router.navigate(['product/update', id]);
  }
}
