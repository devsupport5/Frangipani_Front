// Angular
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
 
import { OrderComponent } from './order.component';


// Theme Routing
import { OrderRoutingModule } from './order-routing.module';


@NgModule({
  imports: [
    CommonModule,
    OrderRoutingModule
  ],
  declarations: [
    OrderComponent, 
    
  ]
})
export class OrderModule { }
