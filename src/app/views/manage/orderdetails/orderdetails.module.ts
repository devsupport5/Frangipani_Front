// Angular
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgxUiLoaderModule } from 'ngx-ui-loader';
import { NgxPaginationModule } from 'ngx-pagination';
import { OrderDetailsComponent } from './orderdetails.component';

import { Ng2SearchPipeModule } from 'ng2-search-filter'; //importing the module
// Theme Routing
import { OrderRoutingModule } from './orderdetails-routing.module';


@NgModule({
  imports: [
    CommonModule,
    OrderRoutingModule,
    NgxUiLoaderModule,
    NgxPaginationModule,
    Ng2SearchPipeModule
  ],
  declarations: [
    OrderDetailsComponent, 
    
  ]
})
export class OrderModule { }
