import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AboutComponent } from './about.component';
import {AuthGuard} from '../shared/login/auth.guard';

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: 'about', component: AboutComponent, canActivate:[AuthGuard],
       data: { roles: ['about'] } }
    ])
  ],
  exports: [RouterModule]
})
export class AboutRoutingModule { }
