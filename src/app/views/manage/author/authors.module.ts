// Angular
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AuthorsComponent } from './authors.component';
import { AddComponent } from './addauthors.component';




// Theme Routing
import { AuthorsRoutingModule } from './authors-routing.module';

@NgModule({
  imports: [
    CommonModule,
    AuthorsRoutingModule
  ],
  declarations: [
    AuthorsComponent,
    AddComponent  
    
  ]
})
export class AuthorsModule { }
