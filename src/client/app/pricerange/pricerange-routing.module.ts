import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PricerangeComponent } from './pricerange.component';
import {AuthGuard} from '../shared/login/auth.guard';

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: 'pricerange', component: PricerangeComponent ,canActivate:[AuthGuard],data: { roles: ['pricerange'] }}
    ])
  ],
  exports: [RouterModule]
})
export class PricerangeRoutingModule { }
