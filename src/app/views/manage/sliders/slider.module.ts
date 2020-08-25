// Angular
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SliderComponent } from './slider.component';
import { AddComponent } from './add.component';
import { NgxUiLoaderModule } from 'ngx-ui-loader';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


// Theme Routing
import { SliderRoutingModule } from './slider-routing.module';

@NgModule({
  imports: [
    CommonModule,
    SliderRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxUiLoaderModule
  ],
  declarations: [
    SliderComponent,
    AddComponent  
    
  ]
})
export class SliderModule { }
