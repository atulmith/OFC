import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CertificationComponent } from './certification.component';
import {AuthGuard} from '../shared/login/auth.guard';

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: 'certification', component: CertificationComponent, canActivate:[AuthGuard],data:{roles: ['certification']}}
    ])
  ],
  exports: [RouterModule]
})
export class CertificationRoutingModule { }
