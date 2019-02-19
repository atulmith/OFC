import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PopularsearchComponent } from './popularsearch.component';
import {DataTableModule,SharedModule,MultiSelectModule} from 'primeng/primeng';
import { AuthGuard } from '../login/auth.guard';
@NgModule({
  imports: [
    RouterModule.forChild([
      { path: 'popularsearch', component: PopularsearchComponent,canActivate:[AuthGuard],data: { roles: ['popularsearch'] } }
    ])
  ],
  exports: [RouterModule]
})
export class PopularsearchRoutingModule { }
