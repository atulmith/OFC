import { Component, OnInit } from '@angular/core';
import { NameListService } from '../shared/index';
import {DataTableModule,SharedModule} from 'primeng/primeng';

import { TestoneListService } from '../shared/testone/index';
import {TestOne} from '../democomp/testone';
import {DialogModule} from 'primeng/primeng';
import {ButtonModule} from 'primeng/primeng';
import {CalendarModule} from 'primeng/primeng';

/**
 * This class represents the lazy loaded HomeComponent.
 */
@Component({
  moduleId: module.id,
  selector: 'sd-home',
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.css'],
})
export class HomeComponent implements OnInit {

  newName: string = '';
  errorMessage: string;
  names: any[] = [];
  date1: Date;
  //for CRUD
      displayDialog: boolean;
      newtestone: boolean;
      testone: TestOne;
      selectedtestone: TestOne;
      testones: TestOne[]=[];

  /**
   * Creates an instance of the HomeComponent with the injected
   * NameListService.
   *
   * @param {NameListService} nameListService - The injected NameListService.
   */
  constructor(public nameListService: NameListService,
              private localService: TestoneListService) {

  }
   
   onRowSelect(event: any) {
        this.newtestone = false;
        this.testone = this.selectedtestone;
        this.displayDialog = true;
    }
    close(){
      this.displayDialog = false;
    }
   showDialogToAdd() {
        this.newtestone = true;
        this.testone={
        
    
            status: '',
            testone_pk: 1,
            testone_city: '',
            testone_name: '',
            testone_state: '',
            testone_address: '',
            testone_country: '',   
    
        }
        this.displayDialog = true;
    }

  /**
   * Get the names OnInit
   */
  ngOnInit() {
    this.getNames();

    // this.localService
    //   .getDisplayAll2()
    //   .subscribe(
    //      /* happy path */ p => this.testones = p,
    //      /* error path */ e => console.log( e),
    //      /* onComplete */ () => console.log('done getDisplayAll2' + JSON.stringify(this.testones)));
          this.testone={
        
    
            status: '',
            testone_pk: 1,
            testone_city: '',
            testone_name: '',
            testone_state: '',
            testone_address: '',
            testone_country: '',   
    
        }
  }

  /**
   * Handle the nameListService observable
   */
  getNames() {
    this.nameListService.get()
      .subscribe(
        names => this.names = names,
        error => this.errorMessage = <any>error
      );
  }

  /**
   * Pushes a new name onto the names array
   * @return {boolean} false to prevent default form submit behavior to refresh the page.
   */
  addName(): boolean {
    // TODO: implement nameListService.post
    this.names.push(this.newName);
    this.newName = '';
    return false;
  }

  onSubmit(){
      //   alert(JSON.stringify(this.selectedRow));
        if(this.newtestone){
        this.localService
      .getUpdateAll(this.testone)
      .subscribe(
         /* happy path */ p => this.testones = p,
         /* error path */ e => console.log(e),
         /* onComplete */ () => console.log("saved CRUD"));

         this.testone = null;
         this.displayDialog = false;
        }else{
          
          this.localService
      .getUpdateAll2(this.testone)
      .subscribe(
         /* happy path */ p => this.testones = p,
         /* error path */ e => console.log(e),
         /* onComplete */ () => console.log("saved CRUD"));

         this.testone = null;
         this.displayDialog = false;
        }

       
  }

}
