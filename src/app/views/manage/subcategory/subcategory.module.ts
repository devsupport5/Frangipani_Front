// Angular
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
 
import { SubCategoryComponent } from './subcategory.component';
import { AddsubComponent } from './addsub.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { Ng2SearchPipeModule } from 'ng2-search-filter'; //importing the module
import { Ng2OrderModule } from 'ng2-order-pipe'; //importing the module
import { FormsModule } from '@angular/forms';
import { NgxUiLoaderModule } from 'ngx-ui-loader';

// Theme Routing
import { SubCategoryRoutingModule } from './subcategory-routing.module';


@NgModule({
  imports: [
    CommonModule,
    SubCategoryRoutingModule,
    FormsModule,
    Ng2SearchPipeModule,
    Ng2OrderModule,
    NgxPaginationModule,
    NgxUiLoaderModule
  ],
  declarations: [
    SubCategoryComponent, 
    AddsubComponent
  ]
})
export class SubCategoryModule { }
