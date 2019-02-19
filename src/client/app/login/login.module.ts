import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { LoginRoutingModule } from './login-routing.module';

import {DataTableModule} from 'primeng/primeng';
import {DialogModule} from 'primeng/primeng';
import {ButtonModule} from 'primeng/primeng';
import {InputTextModule} from 'primeng/primeng';
import {CalendarModule} from 'primeng/primeng';

import { AuthenticationService } from '../shared/login/index';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';

@NgModule({
  imports: [CommonModule, LoginRoutingModule,DataTableModule,DialogModule,ButtonModule,
  FormsModule,ReactiveFormsModule,
  InputTextModule,CalendarModule],
  declarations: [LoginComponent],
  exports: [LoginComponent]
})
export class LoginModule { }
