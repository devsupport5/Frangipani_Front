import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { ProductComponent } from './producttab.component';
import { AddProductComponent } from './addproducttab.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Procuct Tab'
    },
    children: [
      {
        path: '',
        component: ProductComponent,
        data: {
          title: 'Procuct Tab'
        }
      },{
        path: 'procucttab',
        component: ProductComponent,
        data: {
          title: 'Procuct Tab'
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
