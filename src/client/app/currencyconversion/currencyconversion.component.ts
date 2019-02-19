import { Component,OnInit } from '@angular/core';
import {FormGroup,FormControl,Validators,FormBuilder} from '@angular/forms';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import {MessagesModule,Message,Growl} from 'primeng/primeng';
import {PanelModule} from 'primeng/primeng';
import { ActivatedRoute, Router } from '@angular/router';
import {ButtonModule} from 'primeng/primeng';
import {Currencyconversion} from './currencyconversion';

import {Dropdown1} from './dropdown1';
import {FileUpload} from './fileupload';
import {DataTableModule} from 'primeng/primeng';
import {DropdownModule} from 'primeng/primeng';
import {InputTextareaModule} from 'primeng/primeng';

import { MyCurrencyPipe } from '../shared/pipes/first.pipe';
import { CurrencyconversionService } from '../shared/currencyconversion/index';

import {FileUploadModule} from 'primeng/primeng';
import {SelectItem} from 'primeng/primeng';
import { MyDateFormat } from '../shared/pipes/mydateformat.pipe';
import { EmailValidate } from '../shared/pipes/emailvalidate.pipe';
import { CustomValidator } from '../shared/validators/validator.directive';
/**
 * This class represents the lazy loaded currencyconversionComponent.
 */
@Component({
  moduleId: module.id,
  selector: 'sd-currencyconversion',
  templateUrl: 'currencyconversion.component.html',
  styleUrls: ['currencyconversion.component.css'],
  providers:[MyCurrencyPipe,MyDateFormat,EmailValidate,CurrencyconversionService]
})
export class CurrencyconversionComponent implements OnInit {
  //Form grop 
  userform: FormGroup;
 
  // Growl messege
  msgs: Message[]=[];

  //Declare: Data handling for Grid flow, form flow
  
  submitted: boolean;
  currencyconversion: Currencyconversion;
  selectedCurrencyconversionsRow: Currencyconversion;
  currencyconversions: Currencyconversion[]=[];
  displayDialog: boolean;
  
   drpvar: Dropdown1[]=[];
  
  
   drpCurrencyId: SelectItem[]=[];
   drpCurrencyIdTo: SelectItem[]=[];
   startdate: Date;
   enddate: Date;

   
   checked: boolean = false;
   //boolean value for Add new or Edit Mode
   newcurrencyconversion: boolean;
   
  //  selectedcurrencyconversion: string;
       
  //*** fileupload Declare ***
  //Client format for file upload
  uploadedFiles: any[] = [];
  //server format for file upload
  fileuploadarr: FileUpload[]=[];
  fileupload: FileUpload;

  //Prepare data for new entry or initize data during form load by clearing data or presetting data
  clear(){
        this.newcurrencyconversion=true;
        this.currencyconversion={
              currconversion_id:'',
              currconversion_name:'',
              currency_id:'1',
              currency_id_to:'1',
              currconversion_rate:''
             
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
              private localService: CurrencyconversionService,
              private mycur: MyCurrencyPipe,
              private mydate1: MyDateFormat,
              private emailval: EmailValidate
              )
              {

        
       this.localService.getCurrency('hj').subscribe(p =>{this.drpCurrencyId=p;this.drpCurrencyId.unshift({label:"Select" , value:"1"})},e => console.log(e),() => console.log(this.drpCurrencyId));
     
       this.localService.getCurrency('hj').subscribe(p =>{this.drpCurrencyIdTo=p;this.drpCurrencyIdTo.unshift({label:"Select" , value:"1"})},e => console.log(e),() => console.log(this.drpCurrencyIdTo));
    


    
  }
  onRowSelect(event: any){
        
           this.newcurrencyconversion=false;
         //this.contact = this.cloneCar(event.data);
         this.currencyconversion=this.selectedCurrencyconversionsRow;
         
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
        console.log(JSON.stringify(this.currencyconversion));
        this.msgs.push({severity:'info', summary:'Please wait', detail:'Form Submitted Successfully.. Please wait..'})
        
        //  console.log('onSubmit onRowSelect: ' + JSON.stringify (this.currencyconversion));
        //  console.log('onSubmit onRowSelect fileuploadarr: ' + JSON.stringify (this.fileuploadarr));

        if(this.newcurrencyconversion){//Add new entry saving
           this.localService.insert(this.currencyconversion)
          .subscribe(
            /* happy path */ p => this.currencyconversions = p,
            /* error path */ e => console.log(e),
            /* onComplete */ () => this.msgs.push({severity:'info', summary:'Success', detail:'Form Update Successfully'}));
        }
        else{ // update entry saving
          console.log('MILESTONE: ' + JSON.stringify( this.currencyconversion) + ' , f:' +  JSON.stringify( this.fileuploadarr));
          this.localService
          .update(this.currencyconversion)
          .subscribe(
            /* happy path */ p => this.currencyconversions = p,
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
       'currconversion_name':new FormControl('', Validators. required),
       'currency_id':new FormControl('', Validators. required),
       'currency_id_to':new FormControl('', Validators. required),
       'currconversion_rate':new FormControl('', Validators. required),
      });


        //preload data Grid required 
        this.localService
      .getall()
      .subscribe(
         /* happy path */ p => this.currencyconversions=p,
         /* error path */ e => console.log( e),
         /* onComplete */ () => this.processdata());

         
        
  }
  processdata(){
    

  }
 

  drpchange(events1: any){
    //alert(events1.value);
  }

  //Just a method to call user form data on form submit
  get diagnostic() { return JSON.stringify(this.userform.value); }

 }
