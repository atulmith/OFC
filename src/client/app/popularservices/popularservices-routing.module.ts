import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PopularServicesComponent } from './popularservices.component';
import {AuthGuard} from '../shared/login/auth.guard';

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: 'popularservices', component: PopularServicesComponent ,canActivate:[AuthGuard],data: { roles: ['popularservices'] }}
    ])
  ],
  exports: [RouterModule]
})
export class PopularServicesRoutingModule { }
