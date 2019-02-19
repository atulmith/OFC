import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home-routing.module';
import { SharedModule } from '../shared/shared.module';
import { NameListService } from '../shared/name-list/index';


import {DataTableModule} from 'primeng/primeng';
import {DialogModule} from 'primeng/primeng';
import {ButtonModule} from 'primeng/primeng';
import {InputTextModule} from 'primeng/primeng';
import {CalendarModule} from 'primeng/primeng';


import { TestoneListService } from '../shared/testone/index';

@NgModule({
  imports: [CommonModule, HomeRoutingModule, SharedModule,DataTableModule,CalendarModule,InputTextModule,DialogModule,ButtonModule],
  declarations: [HomeComponent],
  exports: [HomeComponent],
  providers: [NameListService,TestoneListService]
})
export class HomeModule { }
