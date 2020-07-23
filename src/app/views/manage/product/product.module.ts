// Angular
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
 
import { ProductComponent } from './product.component';
import { AddProductComponent } from './addproduct.component';

// Theme Routing
import { ProductRoutingModule } from './product-routing.module';


@NgModule({
  imports: [
    CommonModule,
    ProductRoutingModule
  ],
  declarations: [
    ProductComponent, 
    AddProductComponent
  ]
})
export class ProductModule { }
