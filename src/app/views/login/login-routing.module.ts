import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login.component';


const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Authors'
    },
    children: [
      {
        path: '',
        component: LoginComponent,
        data: {
          title: 'Authors'
        }
      },{
        path: 'Authors',
        component: LoginComponent,
        data: {
          title: 'Authors'
        }
      } 
              
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginRoutingModule {}
