import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CertificationComponent } from './certification.component';
import { CertificationRoutingModule } from './certification-routing.module';
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
import {CertificationService} from '../shared/certification/certification.service';

@NgModule({
  imports: [CommonModule, CertificationRoutingModule,FormsModule,DropdownModule,CalendarModule,FileUploadModule,DataTableModule,ReactiveFormsModule,InputTextModule,GrowlModule,ButtonModule,PanelModule,MessagesModule],//,PanelModule,MessagesModule,Growl],
  declarations: [CertificationComponent],
  exports: [CertificationComponent],
  providers: [TestoneListService,MyCurrencyPipe,MyDateFormat,EmailValidate,CertificationService]
})
export class CertificationModule { }
