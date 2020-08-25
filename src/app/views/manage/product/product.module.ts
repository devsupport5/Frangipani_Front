// Angular
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
 
import { ProductComponent } from './product.component';
import { AddProductComponent } from './addproduct.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { Ng2SearchPipeModule } from 'ng2-search-filter'; //importing the module
import { Ng2OrderModule } from 'ng2-order-pipe'; //importing the module
import { NgxUiLoaderModule } from 'ngx-ui-loader';

// Theme Routing
import { ProductRoutingModule } from './product-routing.module';
import { FormsModule } from '@angular/forms';

import { ImageCropperModule } from 'ngx-image-cropper';

@NgModule({
  imports: [
    CommonModule,
    ProductRoutingModule,
    FormsModule,
    ImageCropperModule,
    NgxPaginationModule,
    Ng2SearchPipeModule,
    Ng2OrderModule,
    NgxUiLoaderModule
  ],
  declarations: [
    ProductComponent, 
    AddProductComponent
  ]
})
export class ProductModule { }
