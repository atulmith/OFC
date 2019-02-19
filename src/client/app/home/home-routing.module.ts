import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home.component';
import {AuthGuard} from '../shared/login/auth.guard';

@NgModule({
  imports: [
    RouterModule.forChild([
      // { path: '', component: HomeComponent ,canActivate:[AuthGuard]},
      { path: 'home', component: HomeComponent,canActivate:[AuthGuard],data: { roles: ['home'] } } 
    ])
  ],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
