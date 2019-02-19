import { Component,OnInit } from '@angular/core';
import {FormGroup,FormControl,Validators,FormBuilder} from '@angular/forms';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import {MessagesModule,Message,Growl} from 'primeng/primeng';
import {PanelModule} from 'primeng/primeng';
import { ActivatedRoute, Router } from '@angular/router';
import {ButtonModule} from 'primeng/primeng';
import {Company} from './company';
import {CompanyGrid} from './companyGrid';
import {State} from '../state/state';
import {Dropdown1} from './dropdown1';
import {FileUpload} from './fileupload';
import {DataTableModule} from 'primeng/primeng';
import {DropdownModule} from 'primeng/primeng';
import {InputTextareaModule} from 'primeng/primeng';

import { MyCurrencyPipe } from '../shared/pipes/first.pipe';
import { CompanyService } from '../shared/company/index';

import {FileUploadModule} from 'primeng/primeng';
import {SelectItem} from 'primeng/primeng';
import { MyDateFormat } from '../shared/pipes/mydateformat.pipe';
import { EmailValidate } from '../shared/pipes/emailvalidate.pipe';
import { CustomValidator } from '../shared/validators/validator.directive';
/**
 * This class represents the lazy loaded companyComponent.
 */
@Component({
  moduleId: module.id,
  selector: 'sd-company',
  templateUrl: 'company.component.html',
  styleUrls: ['company.component.css'],
  providers:[MyCurrencyPipe,MyDateFormat,EmailValidate,CompanyService]
})
export class CompanyComponent implements OnInit {
  //Form grop 
  userform: FormGroup;
  stateForm: FormGroup;
  // Growl messege
  msgs: Message[]=[];

  //Declare: Data handling for Grid flow, form flow
  companyGrid: CompanyGrid[]=[];
  selectedcompanygridRow:CompanyGrid;

  submitted: boolean;
  company: Company;
  selectedRow: Company;

  displayDialog: boolean;
  state: State;
  selectedStateRow: State;
  selectedState: State;

  drpCountryId: SelectItem[]=[];
  drpStateId: SelectItem[]=[];
  drpCityId: SelectItem[]=[];
  
  ngModelcountryId: string;
  ngModelStateId: string;
  
   startdate: Date;
   enddate: Date;

   checked: boolean = false;
   //boolean value for Add new or Edit Mode
   newcompany: boolean;
   newState: boolean;
  //  selectedcompany: string;
       
  //*** fileupload Declare ***
  //Client format for file upload
  uploadedFiles: any[] = [];
  //server format for file upload
  fileuploadarr: FileUpload[]=[];
  fileupload: FileUpload;

  //Prepare data for new entry or initize data during form load by clearing data or presetting data
  clear(){
        this.newcompany=true;
        this.company={
               company_id:'',
               company_name:'',
               company_emailid:'',
               city_id:'',
               company_address:'',
               company_phonenos:'',
               company_landline:'',
               company_regno:'',
               createdate:'',
               modifieddate:'',
               status:''
               
               
     };

     this.state={
      
      state_id:'',
      state_name:'',
      state_aliasname:'',
      country_id:'1',
     };
      
      
    this.fileupload={
      fileName: '',
      fileType: '',
      filePath: '',
      fileStatus: '',
      uploadfile_filename: ''
    }
  }


  clearState(){
       
      this.state={
      
      state_id:'',
      state_name:'',
      state_aliasname:'',
      country_id:'1',
     };
      
      
    
  }

  // constructor initiaze of all necessary variable and objects
  constructor(private fb: FormBuilder,
              private route: ActivatedRoute,
              private router: Router,
              private localService: CompanyService,
              private mycur: MyCurrencyPipe,
              private mydate1: MyDateFormat,
              private emailval: EmailValidate
              ){

       //this.populatedrp();
       
     this.localService.getCountry('hj').subscribe(p =>{this.drpCountryId=p;this.drpCountryId.unshift({label:"Select" , value:"1"} )},e => console.log(e),() => console.log(this.drpCountryId));
    

    
  }
  oncompanygridRowSelected(event: any){
         //Indicator for form is in Edit mode
         this.newcompany=false;
         //Copy of row selected
        // this.company=this.selectedRow;
        
         let tempcompanyGrid:CompanyGrid;
         tempcompanyGrid=this.selectedcompanygridRow;
      
       this.ngModelcountryId= tempcompanyGrid.country_id;
       this.ngModelStateId=tempcompanyGrid.state_id;
       
      /* this.localService.getState(this.ngModelcountryId).subscribe(p =>this.drpStateId=p,e => console.log(e),() => console.log(this.drpStateId));
       this.localService.getCity(this.ngModelStateId).subscribe(p =>this.drpCityId=p,e => console.log(e),() => console.log(this.drpCityId));
     */  
       this.localService.getState(this.ngModelcountryId).subscribe(p =>{this.drpStateId=p;this.drpStateId.unshift({label:"Select" , value:"1"} )},e => console.log(e),() => console.log(this.drpStateId));
       this.localService.getCity(this.ngModelStateId).subscribe(p =>{this.drpCityId=p;this.drpCityId.unshift({label:"Select" , value:"1"} )},e => console.log(e),() => console.log(this.drpCityId));
    
        this.localService.getedit(tempcompanyGrid.company_id).subscribe(
         /* happy path */ p => this.company=p,
         /* error path */ e => console.log( e),
         /* onComplete */ () => this.aftercalldate() );//console.log('done getselectEditCompany: ' + this.company));

         
         
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
        console.log(JSON.stringify(this.company));
        this.msgs.push({severity:'info', summary:'Please wait', detail:'Form Submitted Successfully.. Please wait..'})
        
        if(this.newcompany){//Add new entry saving
           this.localService.insert(this.company)
          .subscribe(
            /* happy path */ p => this.companyGrid = p,
            /* error path */ e => console.log(e),
            /* onComplete */ () => this.msgs.push({severity:'info', summary:'Success', detail:'Form Update Successfully'}));
        }
        else{ // update entry saving
          console.log('MILESTONE: ' + JSON.stringify( this.company) + ' , f:' +  JSON.stringify( this.fileuploadarr));
          this.localService
          .update(this.company)
          .subscribe(
            /* happy path */ p => this.companyGrid = p,
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
       'company_name':new FormControl('', null),
       'company_emailid':new FormControl('', Validators.required),
       'city_id':new FormControl('', Validators.required),
       'company_address':new FormControl('', Validators.required),
       'company_phonenos':new FormControl('', Validators.required),
       'company_landline':new FormControl('', Validators.required),
       'company_regno':new FormControl('', Validators.required),
       'country_id':new FormControl('', Validators.required),
       'state_id':new FormControl('', Validators.required)
      
      
  });
        //preload data Grid required 
        this.localService
      .getall()
      .subscribe(
         /* happy path */ p => this.companyGrid=p,
         /* error path */ e => console.log( e),
         /* onComplete */ () => this.processdata());

         
        
  }
  processdata(){
    

  }


  populateStates(events1: any){
    // alert(events1.value);
    this.ngModelcountryId=events1.value;
    this.localService.getState(this.ngModelcountryId).subscribe(p =>this.drpStateId=p,e => console.log(e),() => console.log(this.drpStateId));
  }
  
   populateCity(events1: any){
    // alert(events1.value);
    this.ngModelStateId=events1.value;
    this.localService.getCity(this.ngModelStateId).subscribe(p =>this.drpCityId=p,e => console.log(e),() => console.log(this.drpCityId));
  }
  
  

 }
