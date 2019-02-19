import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CountryComponent } from './country.component';
import { CountryRoutingModule } from './country-routing.module';
import {FormGroup,FormControl,Validators,FormBuilder} from '@angular/forms'
import {PanelModule} from 'primeng/primeng';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import {GrowlModule} from 'primeng/primeng';
import {MessagesModule,Message,Growl} from 'primeng/primeng';
import { ActivatedRoute, Router } from '@angular/router';
import {ButtonModule} from 'primeng/primeng';
import {InputTextModule} from 'primeng/primeng';
import {DataTableModule,InputTextareaModule,DropdownModule} from 'primeng/primeng';

import { CountryService } from '../shared/country/index';


@NgModule({
  imports: [CommonModule, InputTextareaModule,DropdownModule,CountryRoutingModule,FormsModule,DataTableModule,ReactiveFormsModule,InputTextModule,GrowlModule,ButtonModule,PanelModule,MessagesModule],//,PanelModule,MessagesModule,Growl],
  declarations: [CountryComponent],
  exports: [CountryComponent],
  providers: [CountryService]
})
export class CountryModule { }
