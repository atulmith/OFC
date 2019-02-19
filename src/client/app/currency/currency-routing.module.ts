import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CurrencyComponent } from './currency.component';
import {AuthGuard} from '../shared/login/auth.guard';

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: 'currency', component: CurrencyComponent ,canActivate:[AuthGuard],data: { roles: ['currency'] }}
    ])
  ],
  exports: [RouterModule]
})
export class CurrencyRoutingModule { }
