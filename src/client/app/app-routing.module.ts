import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './shared/login/index';
import { AuthenticationService } from './shared/login/index';


@NgModule({
  imports: [
    RouterModule.forRoot([
      /* define app module routes here, e.g., to lazily load a module
         (do not place feature module routes here, use an own -routing.module.ts in the feature instead)
       */
      

    ])
  ],
  exports: [RouterModule]
})

// const appRoutes: Routes = [
//     { path: '', component: HomeComponent, canActivate: [AuthGuard] },
//       { path: '**', redirectTo: '' }
    
// ];
export class AppRoutingModule { }

