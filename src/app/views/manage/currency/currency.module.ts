// Angular
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { CurrencyComponent } from './currency.component';
import { AddComponent } from './add.component';
import { FormsModule } from '@angular/forms';



// Theme Routing
import { CurrencyRoutingModule } from './currency-routing.module';

@NgModule({
  imports: [
    CommonModule,
    CurrencyRoutingModule,
    FormsModule
  ],
  declarations: [
    CurrencyComponent,
    AddComponent  
    
  ]
})
export class CurrencyModule { }
