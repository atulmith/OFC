import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MaincategoryComponent } from './maincategory.component';
import {AuthGuard} from '../shared/login/auth.guard';

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: 'maincategory', component: MaincategoryComponent,canActivate:[AuthGuard],data: { roles: ['maincategory'] } }
    ])
  ],
  exports: [RouterModule]
})
export class MaincategoryRoutingModule { }
