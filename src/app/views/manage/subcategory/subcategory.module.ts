// Angular
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
 
import { SubCategoryComponent } from './subcategory.component';
import { AddsubComponent } from './addsub.component';
import { FormsModule } from '@angular/forms';

// Theme Routing
import { SubCategoryRoutingModule } from './subcategory-routing.module';


@NgModule({
  imports: [
    CommonModule,
    SubCategoryRoutingModule,
    FormsModule
  ],
  declarations: [
    SubCategoryComponent, 
    AddsubComponent
  ]
})
export class SubCategoryModule { }
