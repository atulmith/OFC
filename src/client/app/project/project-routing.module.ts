import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ProjectComponent } from './project.component';
import {AuthGuard} from '../shared/login/auth.guard';

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: 'project', component: ProjectComponent ,canActivate:[AuthGuard]}
    ])
  ],
  exports: [RouterModule]
})
export class ProjectRoutingModule { }
