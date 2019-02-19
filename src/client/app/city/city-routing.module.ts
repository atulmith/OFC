import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CityComponent } from './city.component';
import {DataTableModule,SharedModule,MultiSelectModule} from 'primeng/primeng';
import {AuthGuard} from '../shared/login/auth.guard';

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: 'city', component: CityComponent, canActivate:[AuthGuard],data: { roles: ['city'] }  }
    ])
  ],
  exports: [RouterModule]
})
export class CityRoutingModule { }
