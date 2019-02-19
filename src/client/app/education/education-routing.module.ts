import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { EducationComponent } from './education.component';
import {AuthGuard} from '../shared/login/auth.guard';

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: 'education', component: EducationComponent ,canActivate:[AuthGuard],data: { roles: ['education'] } }
    ])
  ],
  exports: [RouterModule]
})
export class EducationRoutingModule { }
