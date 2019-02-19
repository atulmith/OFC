import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TestimonialComponent } from './testimonial.component';
import {DataTableModule,SharedModule,MultiSelectModule} from 'primeng/primeng';
import { AuthGuard } from '../login/auth.guard';
@NgModule({
  imports: [
    RouterModule.forChild([
      { path: 'testimonial', component: TestimonialComponent,canActivate:[AuthGuard],data: { roles: ['testimonial'] } }
    ])
  ],
  exports: [RouterModule]
})
export class TestimonialRoutingModule { }
