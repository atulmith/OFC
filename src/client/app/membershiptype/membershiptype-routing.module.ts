import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MembershiptypeComponent } from './membershiptype.component';
import {AuthGuard} from '../shared/login/auth.guard';

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: 'membershiptype', component: MembershiptypeComponent ,canActivate:[AuthGuard],data: { roles: ['membershiptype'] }}
    ])
  ],
  exports: [RouterModule]
})
export class MembershiptypeRoutingModule { }
