// Angular
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SliderComponent } from './slider.component';
import { AddComponent } from './add.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';


// Theme Routing
import { SliderRoutingModule } from './slider-routing.module';

@NgModule({
  imports: [
    CommonModule,
    SliderRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    SliderComponent,
    AddComponent  
    
  ]
})
export class SliderModule { }
