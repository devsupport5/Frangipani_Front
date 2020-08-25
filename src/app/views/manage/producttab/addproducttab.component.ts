import { ProductTab } from './crude/producttab';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { ProductTabService } from './crude/producttab.service';
import { Product } from "../product/crude/product";
import { Observable } from "rxjs";
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  templateUrl: 'addproducttab.component.html'
})
export class AddProductComponent  implements OnInit  {

  id: number;
  productTab: ProductTab = new ProductTab();
  submitted = false;
  products: Observable<Product[]>;
  title: string;


  productError: any = 0;
  productNameMsg: any = '';
  tabNameError: any = 0;
  tabNameMsg: any = '';
  sequenceError: any = 0;
  sequenceNameMsg: any = '';

  constructor(private ngxLoader: NgxUiLoaderService,private route: ActivatedRoute,private productTabService: ProductTabService,
    private router: Router) { }

   reloadData() {
     this.products = this.productTabService.getProduct();
     
  }
    
  ngOnInit() {
    this.ngxLoader.start();
    if(localStorage.getItem("userName")=="" || localStorage.getItem("userName")==null){
      this.router.navigate(['/login']);
    }
    this.reloadData();
    this.productTab = new ProductTab();
    this.id = this.route.snapshot.params['id'];

    if(this.id==undefined){
      this.title = "Add";
    }else{
      this.title = "Update";
    }

    if(this.id!=undefined){
      this.productTabService.getProductTab(this.id)
      .subscribe(data => {
        console.log("call-----------"+data);
        this.productTab = data;
        this.ngxLoader.stop();
      }, error => console.log(error));
    }else{
      this.ngxLoader.stop();
    }
      
      if(localStorage.getItem("productId")!=null){
        console.log("This is calll---productId-------------------"+localStorage.getItem("productId")) 
       this.productTab.productId = Number(localStorage.getItem("productId"));
     }else{
      this.productTab.productId = 0;
     }
      
  }


   
  save() {
    this.productTabService.createProductTab(this.productTab)
      .subscribe(data => {
        console.log(data)
        if(data!=null)
            this.gotoList();
       } , error => console.log(error));
    this.productTab = new ProductTab();
    //this.gotoList();
  }

  onOptionsSelected(value:number){
    console.log("the selected value is " + value);
    localStorage.setItem("productId",value+"");
    this.setFlags();
 }


 setFlags(){
  this.productError = 0;
  this.tabNameError = 0;
  this.sequenceError = 0;
}


  onSubmit() {
    if(!this.productTab.productId || this.productTab.productId==0){
      this.productError = 1;
      this.productNameMsg = "Please select product";
      document.getElementById("productId").focus();
      console.log("inside if");
    }else if(!this.productTab.tabName){
      this.tabNameError = 1;
      this.tabNameMsg = "Plesae select slier image";
      document.getElementById("tabName").focus();
      console.log("inside if");
    }else if(isNaN(this.productTab.sequence)){
      this.sequenceError = 1;
      this.sequenceNameMsg = "Sequence only numeric";
      document.getElementById("sequence").focus();
      console.log("inside if");
    }else{
      this.submitted = true;
      this.save();
    }     
  }

  gotoList() {
    this.router.navigate(['/producttab']);
  }
 
}
