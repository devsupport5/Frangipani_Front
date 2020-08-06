// Angular
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { CategoryComponent } from './category.component';
import { AddComponent } from './add.component';
import { FormsModule } from '@angular/forms';

import { ImageCropperModule } from 'ngx-image-cropper';


// Theme Routing
import { CategoryRoutingModule } from './category-routing.module';

@NgModule({
  imports: [
    CommonModule,
    CategoryRoutingModule,
    FormsModule,
    ImageCropperModule
  ],
  declarations: [
    CategoryComponent,
    AddComponent  
    
  ]
})
export class CategoryModule { }
