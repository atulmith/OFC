import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CompanyComponent } from './company.component';
import {DataTableModule,SharedModule,MultiSelectModule} from 'primeng/primeng';
import {AuthGuard} from '../shared/login/auth.guard';

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: 'company', component: CompanyComponent, canActivate:[AuthGuard],data: { roles: ['company'] } }
    ])
  ],
  exports: [RouterModule]
})
export class CompanyRoutingModule { }
