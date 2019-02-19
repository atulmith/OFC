import { Component,OnInit } from '@angular/core';
import {FormGroup,FormControl,Validators,FormBuilder} from '@angular/forms';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import {MessagesModule,Message,Growl} from 'primeng/primeng';
import {PanelModule} from 'primeng/primeng';
import { ActivatedRoute, Router } from '@angular/router';
import {ButtonModule} from 'primeng/primeng';
import {Popularsearch} from './popularsearch';

import {Dropdown1} from './dropdown1';
import {FileUpload} from './fileupload';
import {DataTableModule} from 'primeng/primeng';
import {DropdownModule} from 'primeng/primeng';
import {InputTextareaModule} from 'primeng/primeng';

import { MyCurrencyPipe } from '../shared/pipes/first.pipe';
import { PopularsearchService } from '../shared/popularsearch/index';

import {FileUploadModule} from 'primeng/primeng';
import {SelectItem} from 'primeng/primeng';
import { MyDateFormat } from '../shared/pipes/mydateformat.pipe';
import { EmailValidate } from '../shared/pipes/emailvalidate.pipe';
import { CustomValidator } from '../shared/validators/validator.directive';
import {BaseUrlService} from '../shared/baseurl/baseurl.service';
/**
 * This class represents the lazy loaded popularsearchComponent.
 */
@Component({
  moduleId: module.id,
  selector: 'sd-popularsearch',
  templateUrl: 'popularsearch.component.html',
  styleUrls: ['popularsearch.component.css'],
  providers:[MyCurrencyPipe,MyDateFormat,EmailValidate,PopularsearchService]
})
export class PopularsearchComponent implements OnInit {
  //Form grop 
  userform: FormGroup;
  countryForm: FormGroup;
  // Growl messege
  msgs: Message[]=[];

  //Declare: Data handling for Grid flow, form flow
  
  submitted: boolean;
  popularsearch: Popularsearch;
  selectedPopularsearchsRow: Popularsearch;
  popularsearchgrid: Popularsearch[]=[];
  displayDialog: boolean;
  
   drpMainCatId: SelectItem[]=[];
   

   ngModelMainCatId : string;
   checked: boolean = false;
   //boolean value for Add new or Edit Mode
   newpopularsearch: boolean;
   newCountry: boolean;
  //  selectedpopularsearch: string;
       
  //*** fileupload Declare ***
  //Client format for file upload
  uploadedFiles: any[] = [];
  //server format for file upload
  fileuploadarr: FileUpload[]=[];
  fileupload: FileUpload;

  mybaseurl:string;

  //Prepare data for new entry or initize data during form load by clearing data or presetting data
  clear(){
        this.newpopularsearch=true;
        this.popularsearch={
           popularsearch_id:'',
           popularsearch_srno:'',
           maincat_id:'',
           createdate:'',
           modifieddate:'',status:''
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
              private localService: PopularsearchService,
              private mycur: MyCurrencyPipe,
              private mydate1: MyDateFormat,
              private emailval: EmailValidate,
              private baseurlservice:BaseUrlService
              ){

      
this.localService.getMainCat('hj').subscribe(p =>{this.drpMainCatId=p;this.drpMainCatId.unshift({label:"Select" , value:"1"} )},e => console.log(e),() => console.log(this.drpMainCatId));
  this.mybaseurl=baseurlservice.getBaseurl();    
    
  }
  onRowSelect(event: any){

           this.newpopularsearch=false;
         //this.contact = this.cloneCar(event.data);
         this.popularsearch=this.selectedPopularsearchsRow;
         this.localService.getMainCat('hj').subscribe(p =>{this.drpMainCatId=p;this.drpMainCatId.unshift({label:"Select" , value:"1"} )},e => console.log(e),() => console.log(this.drpMainCatId));
       
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
        console.log(JSON.stringify(this.popularsearch));
        this.msgs.push({severity:'info', summary:'Please wait', detail:'Form Submitted Successfully.. Please wait..'})
        
        //  console.log('onSubmit onRowSelect: ' + JSON.stringify (this.popularsearch));
        //  console.log('onSubmit onRowSelect fileuploadarr: ' + JSON.stringify (this.fileuploadarr));

        if(this.newpopularsearch){//Add new entry saving
           this.localService.insert(this.popularsearch,this.fileuploadarr)
          .subscribe(
            /* happy path */ p => this.popularsearchgrid = p,
            /* error path */ e => console.log(e),
            /* onComplete */ () => this.msgs.push({severity:'info', summary:'Success', detail:'Form Update Successfully'}));
        }
        else{ // update entry saving
          console.log('MILESTONE: ' + JSON.stringify( this.popularsearch) + ' , f:' +  JSON.stringify( this.fileuploadarr));
          this.localService
          .update(this.popularsearch,this.fileuploadarr)
          .subscribe(
            /* happy path */ p => this.popularsearchgrid = p,
            /* error path */ e => console.log(e),
            /* onComplete */ () => this.msgs.push({severity:'info', summary:'Success', detail:'Form Update Successfully'}));
        }
        
    this.clear(); 
  }

 
  
 
  //upload files to the server
onUpload(event: any){
  //alert(event.files);
  this.uploadedFiles=[];
  for(let file of event.files) {
          
          this.uploadedFiles.push(file);
          break;
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
  'popularsearch_srno':new FormControl('', Validators. required),
  'maincat_id':new FormControl('',Validators. required),});

        //preload data Grid required 
        this.localService
      .getall()
      .subscribe(
         /* happy path */ p => this.popularsearchgrid=p,
         /* error path */ e => console.log( e),
         /* onComplete */ () => this.processdata());

         
        
  }
  processdata(){
    

  }

 }
