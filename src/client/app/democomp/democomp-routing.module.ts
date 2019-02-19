import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DemocompComponent } from './democomp.component';
import {AuthGuard} from '../shared/login/auth.guard';

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: 'democomp', component: DemocompComponent ,canActivate:[AuthGuard]}
    ])
  ],
  exports: [RouterModule]
})
export class DemocompRoutingModule { }
