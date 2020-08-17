import { Component,OnInit } from '@angular/core';
import { Observable } from "rxjs";
import { ProductTabService } from "./crude/producttab.service";
import { ProductTab } from "./crude/producttab";
import { Product } from "../product/crude/product";
import { Router } from '@angular/router';
import { environment } from '../../../../environments/environment';

@Component({
  templateUrl: 'producttab.component.html'
})
export class ProductComponent  implements OnInit {

  
  categorys: Observable<ProductTab[]>;
  producttabs: Observable<ProductTab[]>;
  product: ProductTab = new ProductTab();
  products: Observable<Product[]>;
  projectName : string;
  producttab : ProductTab = new ProductTab;

  constructor(private productTabService: ProductTabService,
    private router: Router) {}

    

  ngOnInit() {
    this.projectName = environment.ProjectName;
    if(localStorage.getItem("userName")=="" || localStorage.getItem("userName")==null){
      this.router.navigate(['/login']);
    }
    this.reloadData();
   
  }
 
  reloadData() {
    this.products = this.productTabService.getProduct();
    
    if(localStorage.getItem("productId")!=null){
      console.log("This is calll---productId-------------------"+localStorage.getItem("productId")) 
     this.producttab.productId = Number(localStorage.getItem("productId"));
     this.producttabs = this.productTabService.getProductTabList(this.producttab.productId);
   }else{
    this.producttab.productId = 0;
   }
  }

  onOptionsSelected(value:number){
    console.log("the selected value is " + value);
    localStorage.setItem("productId",value+"");
    this.producttabs = this.productTabService.getProductTabList(value);
}

  deleteProduct(id: number) {
    if(confirm("Are you sure to delete ")) {
       this.productTabService.deleteProductTab(id)
      .subscribe(
        data => {
          console.log(data);
          this.reloadData();
        },
        error => console.log(error));
    }   
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
