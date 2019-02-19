import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LanguageComponent } from './language.component';
import {AuthGuard} from '../shared/login/auth.guard';

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: 'language', component: LanguageComponent ,canActivate:[AuthGuard],data: { roles: ['language'] }}
    ])
  ],
  exports: [RouterModule]
})
export class LanguageRoutingModule { }
