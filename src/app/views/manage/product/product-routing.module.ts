import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { ProductComponent } from './product.component';
import { AddProductComponent } from './addproduct.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Procuct'
    },
    children: [
      {
        path: '',
        component: ProductComponent,
        data: {
          title: 'Procuct'
        }
      },{
        path: 'procuct',
        component: ProductComponent,
        data: {
          title: 'Procuct'
        }
      },{
        path: 'add',
        component: AddProductComponent,
        data: {
          title: 'add'
        }
      },{
        path: 'update/:id',
        component: AddProductComponent,
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
export class ProductRoutingModule {}
