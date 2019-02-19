import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { StateComponent } from './state.component';
import {DataTableModule,SharedModule,MultiSelectModule} from 'primeng/primeng';
import { AuthGuard } from '../login/auth.guard';
@NgModule({
  imports: [
    RouterModule.forChild([
      { path: 'state', component: StateComponent,canActivate:[AuthGuard],data: { roles: ['state'] } }
    ])
  ],
  exports: [RouterModule]
})
export class StateRoutingModule { }
