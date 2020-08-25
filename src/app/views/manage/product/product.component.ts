import { Component,OnInit } from '@angular/core';
import { Observable } from "rxjs";
import { ProductService } from "./crude/product.service";
import { Product } from "./crude/product";
import { ActivatedRoute,Router } from '@angular/router';
import { environment } from '../../../../environments/environment';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  templateUrl: 'product.component.html'
})
export class ProductComponent  implements OnInit {

  
  categorys: Observable<Product[]>;
  products: Observable<Product[]>;
  product: Product = new Product();
  projectName : string;

  totalPage : string;
  decimalOnly :number;
  config: any;
  collection = [];
  filter : any;

  constructor(private ngxLoader: NgxUiLoaderService,private route: ActivatedRoute,private productService: ProductService,
    private router: Router) {      
        this.config = {
          currentPage: 1,
          itemsPerPage: 10,
          totalItems:0
        };
        this.route.queryParams.subscribe(
          params => this.config.currentPage= params['page']?params['page']:1 );        
    }

    pageChange(newPage: number) {
      console.log("queryParams :::"+newPage)
      this.router.navigate(['product'], { queryParams: { page: newPage } });
    }

  ngOnInit() {
    this.ngxLoader.start();
    this.projectName = environment.ProjectName;
    if(localStorage.getItem("userName")=="" || localStorage.getItem("userName")==null){
      this.router.navigate(['/login']);
    }
    this.reloadData();
  }

  reloadData() {
    //this.products = this.productService.getProductList();
    this.productService.getProductList().subscribe(res => {
      this.collection = res;
      this.totalPage = this.collection.length / this.config.itemsPerPage +"";
      if( this.totalPage.indexOf('.') != -1 ){ //check if has decimal
        this.decimalOnly = parseFloat(Math.abs(this.collection.length / this.config.itemsPerPage).toString().split('.')[1]);

        if(this.decimalOnly > 0)
          this.totalPage =  Math.round(parseFloat(this.totalPage) +1) +"";
    }
      if(this.config.currentPage > Math.round(this.collection.length / this.config.itemsPerPage)){
        this.router.navigate(['product'], { queryParams: { page: this.totalPage } });
      }
      this.ngxLoader.stop();
    });
  }

  deleteProduct(id: number) {
    if(confirm("Are you sure to delete ")) {
      this.productService.deleteProduct(id)
      .subscribe(
        data => {
          console.log(data);
          this.reloadData();
        },
        error => console.log(error));
    }   
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

 updateProductFeatured(id: number){ 
  this.productService.getProduct(id).subscribe(data => {
  this.product = data;

   if(this.product.isFeatured==0)
     this.product.isFeatured = 1;
   else
     this.product.isFeatured = 0;
      
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
