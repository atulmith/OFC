import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SkillComponent } from './skill.component';
import {DataTableModule,SharedModule,MultiSelectModule} from 'primeng/primeng';
import { AuthGuard } from '../login/auth.guard';
@NgModule({
  imports: [
    RouterModule.forChild([
      { path: 'skill', component: SkillComponent ,canActivate:[AuthGuard],data: { roles: ['skill'] }}
    ])
  ],
  exports: [RouterModule]
})
export class SkillRoutingModule { }
