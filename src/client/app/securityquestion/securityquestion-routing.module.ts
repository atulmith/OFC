import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SecurityquestionComponent } from './securityquestion.component';
import {DataTableModule,SharedModule,MultiSelectModule} from 'primeng/primeng';
import { AuthGuard } from '../login/auth.guard';
@NgModule({
  imports: [
    RouterModule.forChild([
      { path: 'securityquestion', component: SecurityquestionComponent,canActivate:[AuthGuard],data: { roles: ['securityquestion'] } }
    ])
  ],
  exports: [RouterModule]
})
export class SecurityquestionRoutingModule { }
