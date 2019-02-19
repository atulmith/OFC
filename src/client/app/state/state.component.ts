import { Component,OnInit } from '@angular/core';
import {FormGroup,FormControl,Validators,FormBuilder} from '@angular/forms';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import {MessagesModule,Message,Growl} from 'primeng/primeng';
import {PanelModule} from 'primeng/primeng';
import { ActivatedRoute, Router } from '@angular/router';
import {ButtonModule} from 'primeng/primeng';
import {State} from './state';
import {States} from './states';
import {Country} from '../country/country';
import {Dropdown1} from './dropdown1';
import {FileUpload} from './fileupload';
import {DataTableModule} from 'primeng/primeng';
import {DropdownModule} from 'primeng/primeng';
import {InputTextareaModule} from 'primeng/primeng';

import { MyCurrencyPipe } from '../shared/pipes/first.pipe';
import { StateService } from '../shared/state/index';

import {FileUploadModule} from 'primeng/primeng';
import {SelectItem} from 'primeng/primeng';
import { MyDateFormat } from '../shared/pipes/mydateformat.pipe';
import { EmailValidate } from '../shared/pipes/emailvalidate.pipe';
import { CustomValidator } from '../shared/validators/validator.directive';
/**
 * This class represents the lazy loaded stateComponent.
 */
@Component({
  moduleId: module.id,
  selector: 'sd-state',
  templateUrl: 'state.component.html',
  styleUrls: ['state.component.css'],
  providers:[MyCurrencyPipe,MyDateFormat,EmailValidate,StateService]
})
export class StateComponent implements OnInit {
  //Form grop 
  userform: FormGroup;
 
  // Growl messege
  msgs: Message[]=[];

  //Declare: Data handling for Grid flow, form flow
  states: States[]=[];
  selectedstatesRow:States;

 
  submitted: boolean;
  state: State;
  selectedRow: State;

  displayDialog: boolean;
  country: Country;
  selectedCountryRow: Country;
   selectedCountry: Country;
   // Form data prefilled
   drpvar: Dropdown1[]=[];
  

   drpCountryId: SelectItem[]=[];
   startdate: Date;
   enddate: Date;

   country_city: string[] = [];
   checked: boolean = false;
   //boolean value for Add new or Edit Mode
   newstate: boolean;
   newCountry: boolean;
  //  selectedstate: string;
       
  //*** fileupload Declare ***
  //Client format for file upload
  uploadedFiles: any[] = [];
  //server format for file upload
  fileuploadarr: FileUpload[]=[];
  fileupload: FileUpload;

  //Prepare data for new entry or initize data during form load by clearing data or presetting data
  clear(){
        this.newstate=true;
        this.state={
                state_id:'',
                state_name:'',
                state_aliasname:'',
                country_id:''
               
               
     };

    
      
    this.fileupload={
      fileName: '',
      fileType: '',
      filePath: '',
      fileStatus: '',
      uploadfile_filename: ''
    }
  }



  // constructor initiaze of all necessary variable and objects
  constructor(private fb: FormBuilder,
              private route: ActivatedRoute,
              private router: Router,
              private localService: StateService,
              private mycur: MyCurrencyPipe,
              private mydate1: MyDateFormat,
              private emailval: EmailValidate
              ){

    
      /* this.localService.getCountry('hj').subscribe(p =>this.drpCountryId=p,e => console.log(e),() => console.log(this.drpCountryId));*/
    this.localService.getCountry('hj').subscribe(p =>{this.drpCountryId=p;this.drpCountryId.unshift({label:"Select" , value:"1"} )},e => console.log(e),() => console.log(this.drpCountryId));


    
  }
  onRowSelect(event: any){
         //Indicator for form is in Edit mode
         this.newstate=false;
         //Copy of row selected
        // this.state=this.selectedRow;
        
         let tempstates:States;
         tempstates=this.selectedstatesRow;
      
        this.localService
      .getedit(tempstates.state_id)
      .subscribe(
         /* happy path */ p => this.state=p,
         /* error path */ e => console.log( e),
         /* onComplete */ () => this.aftercalldate() );//console.log('done getselectEditState: ' + this.state));

         
         
  }



  aftercalldate(){
   
  }

  //Prepare for JSON for file to be uploaded to server just after form submission
  onFinalFileUpload(){   
  
    // alert(this.uploadedFiles.length);
    for(let i=0;i<this.uploadedFiles.length;i++){
          let filename=this.uploadedFiles[i].name;
         
          
          this.fileupload.fileName=filename;
          this.fileupload.filePath='';
          this.fileupload.fileStatus='Yes';
          this.fileupload.fileType='img';
          this.fileupload.uploadfile_filename='';
         // alert("insidefileupload: " + JSON.stringify(this.fileupload));
          this.fileuploadarr.push(this.fileupload);
         
        }
   
  } 

  


  onSubmit(){
    
        this.onFinalFileUpload();
        this.submitted = true;
        this.msgs = [];
        console.log(JSON.stringify(this.state));
        //this.msgs.push({severity:'info', summary:'Please wait', detail:'Form Submitted Successfully.. Please wait..'})
        
        //  console.log('onSubmit onRowSelect: ' + JSON.stringify (this.state));
        //  console.log('onSubmit onRowSelect fileuploadarr: ' + JSON.stringify (this.fileuploadarr));

        if(this.newstate){//Add new entry saving
           this.localService.insert(this.state)
          .subscribe(
            /* happy path */ p => this.states = p,
            /* error path */ e => console.log(e),
            /* onComplete */ () => this.msgs.push({severity:'info', summary:'Success', detail:'Form Update Successfully'}));
        }
        else{ // update entry saving
          console.log('MILESTONE: ' + JSON.stringify( this.state) + ' , f:' +  JSON.stringify( this.fileuploadarr));
          this.localService
          .update(this.state)
          .subscribe(
            /* happy path */ p => this.states = p,
            /* error path */ e => console.log(e),
            /* onComplete */ () => this.msgs.push({severity:'info', summary:'Success', detail:'Form Update Successfully'}));
        }
        
    this.clear();   
  }

 

  //upload files to the server
onUpload(event: any){
  //alert(event.files);
  for(let file of event.files) {
          
          this.uploadedFiles.push(file);
  }
  
  //console.log(event.xhr.response);
  this.msgs = [];
  this.msgs.push({severity: 'info', summary: 'File Uploaded', detail: ''});
}

  //File upload event
onBeforeUpload(event :any ){
  event.xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded;multipart/form-data;');
  console.log("mith here:");
}

//Form init
ngOnInit() { 
      //Clear event and initalize objects
      this.clear();
      
     this.userform = this.fb.group({
       'state_name':new FormControl('', Validators. required),
       'state_aliasname':new FormControl('', Validators. required),
       'country_id':new FormControl('', Validators. required),});
      
        //preload data Grid required 
        this.localService
      .getall()
      .subscribe(
         /* happy path */ p => this.states=p,
         /* error path */ e => console.log( e),
         /* onComplete */ () => this.processdata());

         
        
  }
  processdata(){
    

  }
  
 
  //Dropdown change event capture
  drpchange(events1: any){
    //alert(events1.value);
  }

  //Just a method to call user form data on form submit
  get diagnostic() { return JSON.stringify(this.userform.value); }

 }
