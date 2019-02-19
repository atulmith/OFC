import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PrivacyPolicyComponent } from './privacypolicy.component';
import {AuthGuard} from '../shared/login/auth.guard';

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: 'privacypolicy', component: PrivacyPolicyComponent,canActivate:[AuthGuard],data: { roles: ['privacypolicy'] }}
    ])
  ],
  exports: [RouterModule]
})
export class PrivacyPolicyRoutingModule { }
