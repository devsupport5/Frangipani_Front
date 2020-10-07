import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { OrderDetailsComponent } from './orderdetails.component';


const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Order Details'
    },
    children: [
      {
        path: '',
        component: OrderDetailsComponent,
        data: {
          title: 'Order Details'
        }
      },{
        path: 'order',
        component: OrderDetailsComponent,
        data: {
          title: 'Order'
        }
      }
      
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrderRoutingModule {}
