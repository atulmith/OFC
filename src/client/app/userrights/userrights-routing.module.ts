import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UserrightsComponent } from './userrights.component';
import {AuthGuard} from '../shared/login/auth.guard';

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: 'userrights', component: UserrightsComponent,canActivate:[AuthGuard],data: { roles: ['userrights'] }}
    ])
  ],
  exports: [RouterModule]
})
export class UserrightsRoutingModule { }
