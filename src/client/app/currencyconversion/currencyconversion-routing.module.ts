import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CurrencyconversionComponent } from './currencyconversion.component';
import {DataTableModule,SharedModule,MultiSelectModule} from 'primeng/primeng';
import {AuthGuard} from '../shared/login/auth.guard';
@NgModule({
  imports: [
    RouterModule.forChild([
      { path: 'currencyconversion', component: CurrencyconversionComponent,canActivate:[AuthGuard],data: { roles: ['subcategory'] } }
    ])
  ],
  exports: [RouterModule]
})
export class CurrencyconversionRoutingModule { }
