// Angular
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
 
import { ProductComponent } from './product.component';
import { AddProductComponent } from './addproduct.component';

// Theme Routing
import { ProductRoutingModule } from './product-routing.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    ProductRoutingModule,
    FormsModule
  ],
  declarations: [
    ProductComponent, 
    AddProductComponent
  ]
})
export class ProductModule { }
