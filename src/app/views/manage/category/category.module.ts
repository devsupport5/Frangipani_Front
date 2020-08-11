// Angular
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { CategoryComponent } from './category.component';
import { AddComponent } from './add.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ImageCropperModule } from 'ngx-image-cropper';

import { JwPaginationModule } from 'jw-angular-pagination';


// Theme Routing
import { CategoryRoutingModule } from './category-routing.module';

@NgModule({
  imports: [
    CommonModule,
    CategoryRoutingModule,
    FormsModule,
    ImageCropperModule,
    ReactiveFormsModule,
    JwPaginationModule
  ],
  declarations: [
    CategoryComponent,
    AddComponent  
    
  ]
})
export class CategoryModule { }
