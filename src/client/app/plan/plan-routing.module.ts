import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PlanComponent } from './plan.component';
import {DataTableModule,SharedModule,MultiSelectModule} from 'primeng/primeng';
import { AuthGuard } from '../login/auth.guard';
@NgModule({
  imports: [
    RouterModule.forChild([
      { path: 'plan', component: PlanComponent,canActivate:[AuthGuard],data: { roles: ['plan'] } }
    ])
  ],
  exports: [RouterModule]
})
export class PlanRoutingModule { }
