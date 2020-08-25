// Angular
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AuthorsComponent } from './authors.component';
import { AddComponent } from './addauthors.component';
import { FormsModule } from '@angular/forms';
import { ImageCropperModule } from 'ngx-image-cropper';
import { NgxPaginationModule } from 'ngx-pagination';
import { Ng2SearchPipeModule } from 'ng2-search-filter'; //importing the module
import { Ng2OrderModule } from 'ng2-order-pipe'; //importing the module
import { NgxUiLoaderModule } from 'ngx-ui-loader';



// Theme Routing
import { AuthorsRoutingModule } from './authors-routing.module';

@NgModule({
  imports: [
    CommonModule,
    AuthorsRoutingModule,
    FormsModule,
    ImageCropperModule,
    Ng2SearchPipeModule,
    Ng2OrderModule,
    NgxPaginationModule,
    NgxUiLoaderModule
  ],
  declarations: [
    AuthorsComponent,
    AddComponent  
    
  ]
})
export class AuthorsModule { }
