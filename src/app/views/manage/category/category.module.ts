// Angular
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { CategoryComponent } from './category.component';
import { AddComponent } from './add.component';
import { FormsModule } from '@angular/forms';




// Theme Routing
import { CategoryRoutingModule } from './category-routing.module';

@NgModule({
  imports: [
    CommonModule,
    CategoryRoutingModule,
    FormsModule
  ],
  declarations: [
    CategoryComponent,
    AddComponent  
    
  ]
})
export class CategoryModule { }
