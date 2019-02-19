import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TermsConditionComponent } from './termscondition.component';
import {AuthGuard} from '../shared/login/auth.guard';

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: 'termscondition', component: TermsConditionComponent ,canActivate:[AuthGuard],data: { roles: ['termscondition']}}
    ])
  ],
  exports: [RouterModule]
})
export class TermsConditionRoutingModule { }
