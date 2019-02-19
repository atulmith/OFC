import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DemocompComponent } from './democomp.component';
import { DemocompRoutingModule } from './democomp-routing.module';
import {FormGroup,FormControl,Validators,FormBuilder} from '@angular/forms'
import {PanelModule} from 'primeng/primeng';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import {GrowlModule} from 'primeng/primeng';
import {MessagesModule,Message,Growl} from 'primeng/primeng';
import { ActivatedRoute, Router } from '@angular/router';
import {ButtonModule} from 'primeng/primeng';
import {InputTextModule} from 'primeng/primeng';
import {DataTableModule} from 'primeng/primeng';
import {FileUploadModule} from 'primeng/primeng';

import { TestoneListService } from '../shared/testone/index';
import {CalendarModule} from 'primeng/primeng';


@NgModule({
  imports: [CommonModule, DemocompRoutingModule,FormsModule,FileUploadModule,
  DataTableModule,ReactiveFormsModule,InputTextModule,
  GrowlModule,ButtonModule,PanelModule,MessagesModule,CalendarModule],//,PanelModule,MessagesModule,Growl],
  declarations: [DemocompComponent],
  exports: [DemocompComponent],
  providers: [TestoneListService]
})
export class democompModule { }
