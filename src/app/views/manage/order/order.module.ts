// Angular
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgxUiLoaderModule } from 'ngx-ui-loader';
import { NgxPaginationModule } from 'ngx-pagination';
import { OrderComponent } from './order.component';

import { Ng2SearchPipeModule } from 'ng2-search-filter'; //importing the module
// Theme Routing
import { OrderRoutingModule } from './order-routing.module';
import { OrderDetailComponent } from './orderdetail.component';


@NgModule({
  imports: [
    CommonModule,
    OrderRoutingModule,
    NgxUiLoaderModule,
    NgxPaginationModule,
    Ng2SearchPipeModule
  ],
  declarations: [
    OrderComponent, 
    OrderDetailComponent
  ]
})
export class OrderModule { }
