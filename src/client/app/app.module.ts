import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { APP_BASE_HREF } from '@angular/common';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';

import {PanelModule} from 'primeng/primeng';
import {GrowlModule} from 'primeng/primeng';
import {MessagesModule} from 'primeng/primeng';
import {ButtonModule} from 'primeng/primeng';
import {DropdownModule} from 'primeng/primeng';

import { AboutModule } from './about/about.module';
import { HomeModule } from './home/home.module';
import { democompModule } from './democomp/democomp.module';
import { LoginModule } from './login/login.module';
 
import { SharedModule } from './shared/shared.module';
import {InputTextModule} from 'primeng/primeng';
import {DataTableModule} from 'primeng/primeng';
import {DialogModule} from 'primeng/primeng';
import {SpinnerModule} from 'primeng/primeng';
import {EditorModule,SharedModule as primengSharedModule} from 'primeng/primeng';
import {CalendarModule,InputTextareaModule} from 'primeng/primeng';
import {FileUploadModule} from 'primeng/primeng';

//as done on 9 feb 2017 by Mandar for userrights form
import {InputSwitchModule} from 'primeng/primeng';

import {AuthGuard} from './login/auth.guard';
import {ProjectModule} from './project/project.module';

import {MemberModule} from './member/member.module';
import {MaincategoryModule} from './maincategory/maincategory.module';
import {MembershiptypeModule} from './membershiptype/membershiptype.module';
import {EducationModule} from './education/education.module';
import {CertificationModule} from './certification/certification.module';
import {CurrencyModule} from './currency/currency.module';
import {LanguageModule} from './language/language.module';
import {PricerangeModule} from './pricerange/pricerange.module';
import { CountryModule } from './country/country.module';
import { StateModule } from './state/state.module';
import { CityModule } from './city/city.module';
import { CompanyModule } from './company/company.module';

import { SubcategoryModule } from './subcategory/subcategory.module';
import { SkillModule } from './skill/skill.module';

import { CurrencyconversionModule } from './currencyconversion/currencyconversion.module';
import { SecurityquestionModule } from './securityquestion/securityquestion.module';
import { PlanModule } from './plan/plan.module';
import { TestimonialModule } from './testimonial/testimonial.module';
import { PopularsearchModule } from './popularsearch/popularsearch.module';
//as done on 28 jan 2017 by Mandar 
import {PopularServicesModule} from './popularservices/popularservices.module';

//as done on 30 jan 2017 by Mandar
import {TermsConditionModule} from './termscondition/termscondition.module';
import {PrivacyPolicyModule} from './privacypolicy/privacypolicy.module';

//as done on 9 feb 2017 by Mandar for Userrights
import {UserrightsModule } from './userrights/userrights.module';

@NgModule({
  imports: [BrowserModule, 
  HttpModule, AppRoutingModule,
  FormsModule,ReactiveFormsModule,EditorModule,primengSharedModule,
  GrowlModule,PanelModule,MessagesModule,ButtonModule,DropdownModule,DataTableModule,DialogModule,CalendarModule,FileUploadModule,InputTextareaModule,SpinnerModule,
  // FormsModule,PanelModule,ReactiveFormsModule,GrowlModule,MessagesModule,
  democompModule, LoginModule,MemberModule,InputSwitchModule,
  MaincategoryModule,MembershiptypeModule,EducationModule,CertificationModule,
  CurrencyModule,LanguageModule,PricerangeModule,
  StateModule, CityModule, CompanyModule,  SubcategoryModule,
  SkillModule, CurrencyconversionModule,CountryModule,
  SecurityquestionModule, PlanModule, TestimonialModule,
  PopularsearchModule,PopularServicesModule,TermsConditionModule,
  PrivacyPolicyModule,UserrightsModule,
  
  ProjectModule,
  AboutModule, HomeModule,InputTextModule, SharedModule.forRoot()],
  declarations: [AppComponent],
  providers: [
    AuthGuard,
    {
    provide: APP_BASE_HREF,
    useValue: '<%= APP_BASE %>'
  }],
  bootstrap: [AppComponent]

})
export class AppModule { }
