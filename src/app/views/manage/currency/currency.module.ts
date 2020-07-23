// Angular
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { CurrencyComponent } from './currency.component';
import { AddComponent } from './add.component';




// Theme Routing
import { CurrencyRoutingModule } from './currency-routing.module';

@NgModule({
  imports: [
    CommonModule,
    CurrencyRoutingModule
  ],
  declarations: [
    CurrencyComponent,
    AddComponent  
    
  ]
})
export class CurrencyModule { }
