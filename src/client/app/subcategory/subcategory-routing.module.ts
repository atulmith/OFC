import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SubcategoryComponent } from './subcategory.component';
import {DataTableModule,SharedModule,MultiSelectModule} from 'primeng/primeng';
import { AuthGuard } from '../login/auth.guard';

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: 'subcategory', component: SubcategoryComponent,canActivate:[AuthGuard],data: { roles: ['subcategory'] } }
    ])
  ],
  exports: [RouterModule]
})
export class SubcategoryRoutingModule { }
