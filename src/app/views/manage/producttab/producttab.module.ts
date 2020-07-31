// Angular
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
 
import { ProductComponent } from './producttab.component';
import { AddProductComponent } from './addproducttab.component';

// Theme Routing
import { ProductRoutingModule } from './producttab-routing.module';
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
export class ProductTabModule { }
