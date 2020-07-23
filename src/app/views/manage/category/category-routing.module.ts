import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CategoryComponent } from './category.component';
import { AddComponent } from './add.component';


const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Category'
    },
    children: [
      {
        path: '',
        component: CategoryComponent,
        data: {
          title: 'Category'
        }
      },{
        path: 'category',
        component: CategoryComponent,
        data: {
          title: 'Category'
        }
      },{
        path: 'add',
        component: AddComponent,
        data: {
          title: 'add'
        },
      },{
        path: 'update/:id',
        component: AddComponent,
        data: {
          title: 'update'
        },
      }           
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoryRoutingModule {}
