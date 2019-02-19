import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CurrencyconversionComponent } from './currencyconversion.component';
import { CurrencyconversionRoutingModule } from './currencyconversion-routing.module';
import {FormGroup,FormControl,Validators,FormBuilder} from '@angular/forms'
import {PanelModule} from 'primeng/primeng';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import {GrowlModule} from 'primeng/primeng';
import {MessagesModule,Message,Growl} from 'primeng/primeng';
import { ActivatedRoute, Router } from '@angular/router';
import {ButtonModule} from 'primeng/primeng';
import {InputTextModule} from 'primeng/primeng';
import {DataTableModule, SpinnerModule} from 'primeng/primeng';
import {FileUploadModule} from 'primeng/primeng';
import {DropdownModule,DialogModule, RadioButtonModule,CheckboxModule} from 'primeng/primeng';
import {CalendarModule} from 'primeng/primeng';

import { MyCurrencyPipe } from '../shared/pipes/first.pipe';
import { MyDateFormat } from '../shared/pipes/mydateformat.pipe';
import { BaseUrlService } from '../shared/baseurl/index';

import { CurrencyconversionService } from '../shared/currencyconversion/index';

import { EmailValidate } from '../shared/pipes/emailvalidate.pipe';


@NgModule({
  imports: [CommonModule, CurrencyconversionRoutingModule,FormsModule,RadioButtonModule,CheckboxModule,DropdownModule,DialogModule,CalendarModule,FileUploadModule,DataTableModule,ReactiveFormsModule,InputTextModule,GrowlModule,ButtonModule,PanelModule,MessagesModule,SpinnerModule],//,PanelModule,MessagesModule,Growl],
  declarations: [CurrencyconversionComponent],
  exports: [CurrencyconversionComponent],
  providers: [CurrencyconversionService,MyCurrencyPipe,MyDateFormat,EmailValidate,BaseUrlService]
})
export class CurrencyconversionModule { }
