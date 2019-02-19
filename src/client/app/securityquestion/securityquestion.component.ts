import { Component,OnInit } from '@angular/core';
import {FormGroup,FormControl,Validators,FormBuilder} from '@angular/forms';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import {MessagesModule,Message,Growl} from 'primeng/primeng';
import {PanelModule} from 'primeng/primeng';
import { ActivatedRoute, Router } from '@angular/router';
import {ButtonModule} from 'primeng/primeng';
import {Securityquestion} from './securityquestion';

import {Dropdown1} from './dropdown1';
import {FileUpload} from './fileupload';
import {DataTableModule} from 'primeng/primeng';
import {DropdownModule} from 'primeng/primeng';
import {InputTextareaModule} from 'primeng/primeng';

import { MyCurrencyPipe } from '../shared/pipes/first.pipe';
import { SecurityquestionService } from '../shared/securityquestion/index';

import {FileUploadModule} from 'primeng/primeng';
import {SelectItem} from 'primeng/primeng';
import { MyDateFormat } from '../shared/pipes/mydateformat.pipe';
import { EmailValidate } from '../shared/pipes/emailvalidate.pipe';
import { CustomValidator } from '../shared/validators/validator.directive';
/**
 * This class represents the lazy loaded securityquestionComponent.
 */
@Component({
  moduleId: module.id,
  selector: 'sd-securityquestion',
  templateUrl: 'securityquestion.component.html',
  styleUrls: ['securityquestion.component.css'],
  providers:[MyCurrencyPipe,MyDateFormat,EmailValidate,SecurityquestionService]
})
export class SecurityquestionComponent implements OnInit {
  //Form grop 
  userform: FormGroup;
 
  // Growl messege
  msgs: Message[]=[];

  //Declare: Data handling for Grid flow, form flow
  
  submitted: boolean;
  securityquestion: Securityquestion;
  selectedSecurityquestionsRow: Securityquestion;
  securityquestions: Securityquestion[]=[];
  displayDialog: boolean;
  
   drpvar: Dropdown1[]=[];
  
  
   drpCurrencyId: SelectItem[]=[];
   startdate: Date;
   enddate: Date;

   
   checked: boolean = false;
   //boolean value for Add new or Edit Mode
   newsecurityquestion: boolean;
   
  //  selectedsecurityquestion: string;
       
  //*** fileupload Declare ***
  //Client format for file upload
  uploadedFiles: any[] = [];
  //server format for file upload
  fileuploadarr: FileUpload[]=[];
  fileupload: FileUpload;

  //Prepare data for new entry or initize data during form load by clearing data or presetting data
  clear(){
        this.newsecurityquestion=true;
        this.securityquestion={
           securityquest_id:'',
           securityquest_name:'',
           securityquest_alias:'',
           createdate:'',
           modifieddate:'',
           status:''
             
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
              private localService: SecurityquestionService,
              private mycur: MyCurrencyPipe,
              private mydate1: MyDateFormat,
              private emailval: EmailValidate
              ){

        
       this.localService.getCurrency('hj').subscribe(p =>{
                this.drpCurrencyId=p;
                 
                this.drpCurrencyId.unshift({label:"Select" , value:"1"} )
              }
       
          ,e => console.log(e),() => console.log(this.drpCurrencyId));
    

    
  }
  onRowSelect(event: any){
        
           this.newsecurityquestion=false;
         //this.contact = this.cloneCar(event.data);
         this.securityquestion=this.selectedSecurityquestionsRow;
         
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
        console.log(JSON.stringify(this.securityquestion));
        this.msgs.push({severity:'info', summary:'Please wait', detail:'Form Submitted Successfully.. Please wait..'})
        
        //  console.log('onSubmit onRowSelect: ' + JSON.stringify (this.securityquestion));
        //  console.log('onSubmit onRowSelect fileuploadarr: ' + JSON.stringify (this.fileuploadarr));

        if(this.newsecurityquestion){//Add new entry saving
           this.localService.insert(this.securityquestion)
          .subscribe(
            /* happy path */ p => this.securityquestions = p,
            /* error path */ e => console.log(e),
            /* onComplete */ () => this.msgs.push({severity:'info', summary:'Success', detail:'Form Update Successfully'}));
        }
        else{ // update entry saving
          console.log('MILESTONE: ' + JSON.stringify( this.securityquestion) + ' , f:' +  JSON.stringify( this.fileuploadarr));
          this.localService
          .update(this.securityquestion)
          .subscribe(
            /* happy path */ p => this.securityquestions = p,
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
      'securityquest_name':new FormControl('', Validators. required),
      'securityquest_alias':new FormControl('', Validators. required),});

        //preload data Grid required 
        this.localService
      .getall()
      .subscribe(
         /* happy path */ p => this.securityquestions=p,
         /* error path */ e => console.log( e),
         /* onComplete */ () => this.processdata());

         
        
  }
  processdata(){
    

  }
  populatedrp(){ //populate dropdowns on page load. by using push and SelectItem
   
        this.drpCurrencyId.push({label:"India" , value:"India"});
        this.drpCurrencyId.push({label:"USA" , value:"USA"});
        this.drpCurrencyId.push({label:"UK" , value:"UK"});
        
        // alert(JSON.stringify(this.drpsecurityquestion));

  }

  drpchange(events1: any){
    //alert(events1.value);
  }

  //Just a method to call user form data on form submit
  get diagnostic() { return JSON.stringify(this.userform.value); }

 }
