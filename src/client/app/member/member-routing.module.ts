import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MemberComponent } from './member.component';
import {AuthGuard} from '../shared/login/auth.guard';

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: 'member', component: MemberComponent ,canActivate:[AuthGuard],data: { roles: ['member'] }}
    ])
  ],
  exports: [RouterModule]
})
export class MemberRoutingModule { }
