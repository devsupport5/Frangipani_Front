import { Component,OnInit } from '@angular/core';
import { Observable } from "rxjs";
import { OrderService } from "./crude/order.service";
import { Order } from "./crude/order";
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  templateUrl: 'order.component.html'
})
export class OrderComponent implements OnInit {

  
  categorys: Observable<Order[]>;
  order: Order = new Order();
  projectName : string;
  
  totalPage : string;
  decimalOnly :number;
  config: any;
  collection = [];
  filter : any;
  /*items = [];
  pageOfItems: Array<any>;*/

  

  constructor(private ngxLoader: NgxUiLoaderService,private route: ActivatedRoute, private orderService: OrderService,
    private router: Router,private http: HttpClient) {
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
      this.router.navigate(['order'], { queryParams: { page: newPage } });
    }


  ngOnInit() {
    this.ngxLoader.start();
    this.reloadData();
    this.projectName = environment.ProjectName;
    if(localStorage.getItem("userName")=="" || localStorage.getItem("userName")==null){
      this.router.navigate(['/login']);
    }
  }


  
  

  reloadData() {
    console.log("call Reload data");  
    this.orderService.getOrdersList().subscribe(res => {
      this.collection = res;
      this.totalPage = this.collection.length / this.config.itemsPerPage +"";
      if( this.totalPage.indexOf('.') != -1 ){ //check if has decimal
        this.decimalOnly = parseFloat(Math.abs(this.collection.length / this.config.itemsPerPage).toString().split('.')[1]);

        if(this.decimalOnly > 0)
          this.totalPage =  Math.round(parseFloat(this.totalPage) +1) +"";
    }
      if(this.config.currentPage > Math.round(this.collection.length / this.config.itemsPerPage)){
        this.router.navigate(['order'], { queryParams: { page: this.totalPage } });
      }
      this.ngxLoader.stop();
    });
    
  }

   
  deleteCategory(id: number) {

    if(confirm("Are you sure to delete ")) {
      this.orderService.deleteOrder(id)
        .subscribe(
          data => {
            console.log(data);
            this.reloadData();
          },
          error => console.log(error));
      }
  }

  updateCategoryStatus(id: number){ 
   
  }

  orderDetails(id: number){
    this.router.navigate(['details', id]);
  }

  getOrderDetails(id: number){
    this.router.navigate(['order/orderdetail', id]);
  }

}
