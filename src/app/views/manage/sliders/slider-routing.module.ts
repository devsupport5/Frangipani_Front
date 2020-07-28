import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SliderComponent } from './slider.component';

import { AddComponent } from './add.component';




const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Slider'
    },
    children: [
      {
        path: '',
        component: SliderComponent,
        data: {
          title: 'Slider'
        }
      },{
        path: 'slider',
        component: SliderComponent,
        data: {
          title: 'Slider'
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
        },
      }            
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SliderRoutingModule {}
