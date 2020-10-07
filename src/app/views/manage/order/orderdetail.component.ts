import { OrderDetails } from './crude/orderdetails';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { OrderService } from './crude/order.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Order } from './crude/order';

@Component({
  templateUrl: 'orderdetail.component.html'
})
export class OrderDetailComponent implements OnInit  {

  id: number;
  orderDetails: OrderDetails = new OrderDetails();
  submitted = false;

  order : Order = new Order();

  imageChangedEvent: any = '';
  croppedImage: any = '';
  flag: number = 0;
  title: string;
  totalPage : string;
  decimalOnly :number;
  config: any;
  collection = [];
  filter : any;
  

  constructor(private ngxLoader: NgxUiLoaderService,private route: ActivatedRoute,private orderService: OrderService,
    private router: Router) { this.config = {
      currentPage: 1,
      itemsPerPage: 10,
      totalItems:0
    };
    this.route.queryParams.subscribe(
      params => this.config.currentPage= params['page']?params['page']:1 );        
  }

  pageChange(newPage: number) {
    console.log("queryParams :::"+newPage)
    this.router.navigate(['order/orderdetail', this.id], { queryParams: { page: newPage } });
  }
   
   

  ngOnInit() {
    this.ngxLoader.start();
    if(localStorage.getItem("userName")=="" || localStorage.getItem("userName")==null){
      this.router.navigate(['/login']);
    }
      this.title = "Order Detail";
      this.id = this.route.snapshot.params['id'];
console.log("this.id------------->"+this.id)
this.reloadData();
/*if(this.id!=undefined){
    this.orderService.getOrderDetailList(this.id)
      .subscribe(data => {
        console.log(data)
        this.orderDetails = data;
        this.ngxLoader.stop();
      }, error => console.log(error));
    }else{
      this.ngxLoader.stop();
    } */

  }


  reloadData() {
    console.log("call Reload data");  
    this.orderService.getOrderDetailList(this.id).subscribe(res => {
      this.collection = res;
      this.totalPage = this.collection.length / this.config.itemsPerPage +"";
      if( this.totalPage.indexOf('.') != -1 ){ //check if has decimal
        this.decimalOnly = parseFloat(Math.abs(this.collection.length / this.config.itemsPerPage).toString().split('.')[1]);

        if(this.decimalOnly > 0)
          this.totalPage =  Math.round(parseFloat(this.totalPage) +1) +"";
    }
      if(this.config.currentPage > Math.round(this.collection.length / this.config.itemsPerPage)){
        this.router.navigate(['order/orderdetail', this.id], { queryParams: { page: this.totalPage } });
      }
      this.ngxLoader.stop();
    });


    
    this.orderService.getOrdersListById(this.id).subscribe(res => {
      this.order = res;
          
    });
    
  }


  newCategory(): void {
    this.submitted = false;
    this.orderDetails = new OrderDetails();
  }

  setFlags(){
     


    
  }
 
 async save() {
     
  }
/*
  onFileChanged(event) {
    console.log("This is call file")
    this.getBase64(event);
  }

  getBase64(event) {
    let me = this;
    let file = event.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      //me.modelvalue = reader.result;
      me.category.image = reader.result.toString();
      console.log(reader.result);
    };
    reader.onerror = function (error) {
      console.log('Error: ', error);
    };
 }


 fileChangeEvent(event: any): void {
  this.imageChangedEvent = event;
}
imageCropped(event: ImageCroppedEvent) {
  this.croppedImage = event.base64;
  console.log(this.croppedImage);
  this.category.image = this.croppedImage;
}
imageLoaded() {
  this.flag = 1;
}
cropperReady() {
   
}
loadImageFailed() {
   
}
 
  onSubmit() {
    //this.submitted = true;
    //this.save();    

    if(!this.category.categoryName){
      this.categoryNameError = 1;
      this.categoryNameMsg = "Category Name cannot be empty";
      console.log("inside if");
      document.getElementById("categoryName").focus();
    }
    else{
      console.log("Form submitted successfully");
      this.submitted = true;
      this.save(); 
      }   

  }
*/
  gotoList() {
    this.router.navigate(['/category']);
  }
 
}
