import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthorsComponent } from './authors.component';
import { AddComponent } from './addauthors.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Authors'
    },
    children: [
      {
        path: '',
        component: AuthorsComponent,
        data: {
          title: 'Authors'
        }
      },{
        path: 'Authors',
        component: AuthorsComponent,
        data: {
          title: 'Authors'
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
export class AuthorsRoutingModule {}
