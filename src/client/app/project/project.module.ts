import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectComponent } from './project.component';
import { ProjectRoutingModule } from './project-routing.module';
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
import {DropdownModule} from 'primeng/primeng';
import {CalendarModule} from 'primeng/primeng';

import { MyCurrencyPipe } from '../shared/pipes/first.pipe';
import { MyDateFormat } from '../shared/pipes/mydateformat.pipe';

import { TestoneListService } from '../shared/testone/index';
import { EmailValidate } from '../shared/pipes/emailvalidate.pipe';
import {ProjectService} from '../shared/project/project.service';

@NgModule({
  imports: [CommonModule, ProjectRoutingModule,FormsModule,DropdownModule,CalendarModule,FileUploadModule,DataTableModule,ReactiveFormsModule,InputTextModule,GrowlModule,ButtonModule,PanelModule,MessagesModule],//,PanelModule,MessagesModule,Growl],
  declarations: [ProjectComponent],
  exports: [ProjectComponent],
  providers: [TestoneListService,MyCurrencyPipe,MyDateFormat,EmailValidate,ProjectService]
})
export class ProjectModule { }
