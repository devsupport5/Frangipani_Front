import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CurrencyComponent } from './currency.component';

import { AddComponent } from './add.component';




const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Currency'
    },
    children: [
      {
        path: '',
        component: CurrencyComponent,
        data: {
          title: 'Currency'
        }
      },{
        path: 'currency',
        component: CurrencyComponent,
        data: {
          title: 'Currency'
        }
      },{
        path: 'add',
        component: AddComponent,
        data: {
          title: 'add'
        }
      },{
        path: 'update/:id',
        component: AddComponent,
        data: {
          title: 'update'
        }
      }           
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CurrencyRoutingModule {}
