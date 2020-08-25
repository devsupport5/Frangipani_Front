// Angular
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { CategoryComponent } from './category.component';
import { AddComponent } from './add.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ImageCropperModule } from 'ngx-image-cropper';
import { NgxPaginationModule } from 'ngx-pagination';
import { JwPaginationModule } from 'jw-angular-pagination';
import { Ng2SearchPipeModule } from 'ng2-search-filter'; //importing the module
import { Ng2OrderModule } from 'ng2-order-pipe'; //importing the module
import { NgxUiLoaderModule } from 'ngx-ui-loader';


// Theme Routing
import { CategoryRoutingModule } from './category-routing.module';

@NgModule({
  imports: [
    CommonModule,
    CategoryRoutingModule,
    FormsModule,
    ImageCropperModule,
    ReactiveFormsModule,
    JwPaginationModule,
    NgxPaginationModule,
    Ng2SearchPipeModule,
    Ng2OrderModule,
    NgxUiLoaderModule
  ],
  declarations: [
    CategoryComponent,
    AddComponent  
    
  ]
})
export class CategoryModule { }
