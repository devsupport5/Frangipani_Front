import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { OrderComponent } from './order.component';


const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Order'
    },
    children: [
      {
        path: '',
        component: OrderComponent,
        data: {
          title: 'Order'
        }
      },{
        path: 'order',
        component: OrderComponent,
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
