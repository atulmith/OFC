import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PricerangeComponent } from './pricerange.component';
import { PricerangeRoutingModule } from './pricerange-routing.module';
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
import {CalendarModule,SpinnerModule} from 'primeng/primeng';

import { MyCurrencyPipe } from '../shared/pipes/first.pipe';
import { MyDateFormat } from '../shared/pipes/mydateformat.pipe';

import { TestoneListService } from '../shared/testone/index';
import { EmailValidate } from '../shared/pipes/emailvalidate.pipe';
import {PriceRangeService} from '../shared/pricerange/pricerange.service';

@NgModule({
  imports: [CommonModule, PricerangeRoutingModule,FormsModule,DropdownModule,CalendarModule,FileUploadModule,DataTableModule,ReactiveFormsModule,InputTextModule,GrowlModule,ButtonModule,PanelModule,MessagesModule,SpinnerModule],//,PanelModule,MessagesModule,Growl],
  declarations: [PricerangeComponent],
  exports: [PricerangeComponent],
  providers: [TestoneListService,MyCurrencyPipe,MyDateFormat,EmailValidate,PriceRangeService]
})
export class PricerangeModule { }
