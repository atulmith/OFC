import { Component,OnInit } from '@angular/core';
import {FormGroup,FormControl,Validators,FormBuilder} from '@angular/forms';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import {MessagesModule,Message,Growl} from 'primeng/primeng';
import {PanelModule} from 'primeng/primeng';
import { ActivatedRoute, Router } from '@angular/router';
import {ButtonModule} from 'primeng/primeng';
import {Language} from './language';
import {Dropdown1} from './dropdown1';
import {FileUpload} from './fileupload';
import {DataTableModule} from 'primeng/primeng';
import {DropdownModule} from 'primeng/primeng';


import { MyCurrencyPipe } from '../shared/pipes/first.pipe';
import { LanguageService } from '../shared/language/index';

import {FileUploadModule} from 'primeng/primeng';
import {SelectItem} from 'primeng/primeng';
import { MyDateFormat } from '../shared/pipes/mydateformat.pipe';
import { EmailValidate } from '../shared/pipes/emailvalidate.pipe';
import { CustomValidator } from '../shared/validators/validator.directive';
import {BaseUrlService} from '../shared/baseurl/baseurl.service';
/**
 * This class represents the lazy loaded languageComponent.
 */
@Component({
  moduleId: module.id,
  selector: 'sd-language',
  templateUrl: 'language.component.html',
  styleUrls: ['language.component.css'],
  providers:[MyCurrencyPipe,MyDateFormat,EmailValidate,BaseUrlService]
})
export class LanguageComponent implements OnInit {
  //Form grop 
  userform: FormGroup;
  // Growl messege
  msgs: Message[]=[];

  //Declare: Data handling for Grid flow, form flow
  languages: Language[]=[];
  submitted: boolean;
  language: Language;
  selectedRow: Language;

   // Form data prefilled
   drpvar: Dropdown1[]=[];
   drplanguage: SelectItem[]=[];
   startdate: Date;
   enddate: Date;

   //boolean value for Add new or Edit Mode
   newlanguage: boolean;
   
  //  selectedlanguage: string;
       
  //*** fileupload Declare ***
  //Client format for file upload
  uploadedFiles: any[] = [];
  //server format for file upload
  fileuploadarr: FileUpload[]=[];
  fileupload: FileUpload;

  mybaseurl:string;

  //Prepare data for new entry or initize data during form load by clearing data or presetting data
  clear(){
        this.newlanguage=true;
        this.language={
          language_id:'',language_name:'',language_alias:'',createdate:'',modifieddate:'',status:''
        }


      
      
      
    // this.fileupload={
    //   fileName: '',
    //   fileType: '',
    //   filePath: '',
    //   fileStatus: '',
    //   uploadfile_filename: ''
    // }
  }

  // constructor initiaze of all necessary variable and objects
  constructor(private fb: FormBuilder,
              private route: ActivatedRoute,
              private router: Router,
              private localService: LanguageService,
              private mycur: MyCurrencyPipe,
              private mydate1: MyDateFormat,
              private emailval: EmailValidate,
              private baseUrlservice:BaseUrlService
              ){
           this.mybaseurl=baseUrlservice.getBaseurl();     
          // drpop down can only be populated in constructor and not in nginit()
          // this.localService
          // .getselectdrplanguage('hj')
          // .subscribe(
          //   /* happy path */ p =>this.drpvar=p,//alert( JSON.stringify( p)),
          //   /* error path */ e => console.log(e),
          //   /* onComplete */ () => this.populatedrp());//{this.mymethod(this.drpvar);});//this.msgs.push({severity:'info', summary:'Success', detail:'Form Update Successfully: ' + JSON.stringify( this.drpvar) + ' : ' + this.drpvar.length}));

    
  }
  onRowSelect(event: any){
         //Indicator for form is in Edit mode
         this.newlanguage=false;
         //Copy of row selected
        //  this.language=this.selectedRow;
         let tempproj: Language;
         tempproj = this.selectedRow;
         //Calling WS to get the selected data from server DB of the selected row
      //    this.localService
      // .getselectAllfileLanguage(tempproj.language_id)
      // .subscribe(
      //    /* happy path */ p => this.fileuploadarr=p,
      //    /* error path */ e => console.log( e),
      //    /* onComplete */ () => console.log('done getselectAllfileuploadlanguage: ' + this.fileuploadarr));

        //  console.log('onRowSelect: ' + JSON.stringify (this.language));
        //  console.log('onRowSelect fileuploadarr: ' + JSON.stringify (this.fileuploadarr));

         //Calling WS to get the selected data from server DB of the selected row
        this.localService
      .getedit(tempproj.language_id)
      .subscribe(
         /* happy path */ p => this.language=p,
         /* error path */ e => console.log( e),
         /* onComplete */ () => {this.aftercalldate();} );//console.log('done getselectEditlanguage: ' + this.language));

         
         
  }
  aftercalldate(){
    //  alert(JSON.stringify( this.language));
    // alert(this.language.language_enddate);
    //      alert(new Date(Number(this.language.language_enddate) ));
    //      alert(new Date(Number(this.language.language_startdate) ));
    // this.startdate  = new Date(Number(this.language.language_startdate ));
    // this.enddate  = new Date(Number(this.language.language_enddate ));
  }

  //Prepare for JSON for file to be uploaded to server just after form submission
  onFinalFileUpload(){   
  
    // // alert(this.uploadedFiles.length);
    // for(let i=0;i<this.uploadedFiles.length;i++){
    //       let filename=this.uploadedFiles[i].name;
         
          
    //       this.fileupload.fileName=filename;
    //       this.fileupload.filePath='';
    //       this.fileupload.fileStatus='Yes';
    //       this.fileupload.fileType='img';
    //       this.fileupload.uploadfile_filename='';
    //      // alert("insidefileupload: " + JSON.stringify(this.fileupload));
    //       this.fileuploadarr.push(this.fileupload);
         
    //     }
   
  } 

  // Date change event to format ngmodel to our format date and calling pipe 
  // startdatechange(){
  //   this.language.projmile_startdate=this.mydate1.parse(this.language.projmile_startdate)
  // }
  // enddatechange(){
  //   this.language.projmile_enddate=this.mydate1.parse(this.language.projmile_enddate)
  // }


  onSubmit(){
      //   alert(JSON.stringify(this.selectedRow));
        //alert(this.language.language_startdate);
        // this.language.language_startdate=this.mydate1.parse(this.startdate)
  
        // this.language.language_enddate=this.mydate1.parse(this.enddate)
        
        this.onFinalFileUpload();
        this.submitted = true;
        this.msgs = [];
        console.log(JSON.stringify(this.language));
        this.msgs.push({severity:'info', summary:'Please wait', detail:'Form Submitted Successfully.. Please wait..'})
        
        //  console.log('onSubmit onRowSelect: ' + JSON.stringify (this.language));
        //  console.log('onSubmit onRowSelect fileuploadarr: ' + JSON.stringify (this.fileuploadarr));

        if(this.newlanguage){//Add new entry saving
           this.localService
          .insert(this.language)
          .subscribe(
            /* happy path */ p => this.languages = p,
            /* error path */ e => console.log(e),
            /* onComplete */ () => this.msgs.push({severity:'info', summary:'Success', detail:'Form Update Successfully'}));
        }
        else{ // update entry saving
          console.log('language: ' + JSON.stringify( this.language) + ' , f:' +  JSON.stringify( this.fileuploadarr));
          this.localService
          .update(this.language)
          .subscribe(
            /* happy path */ p => this.languages = p,
            /* error path */ e => console.log(e),
            /* onComplete */ () => this.msgs.push({severity:'info', summary:'Success', detail:'Form Update Successfully'}));
        }
          this.submitted = true;
          this.msgs = [];
          this.msgs.push({severity:'info', summary:'Success', detail:'Form Update Successfully'});

          this.clear();
  }

  //upload files to the server
onUpload(event: any){
  // //alert(event.files);
  // for(let file of event.files) {
          
  //         this.uploadedFiles.push(file);
  // }
  
  // //console.log(event.xhr.response);
  // this.msgs = [];
  // this.msgs.push({severity: 'info', summary: 'File Uploaded', detail: ''});
}

  //File upload event
onBeforeUpload(event :any ){
  // event.xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded;multipart/form-data;');
  // console.log("mith here:");
}

//Form init
ngOnInit() { 
      //Clear event and initalize objects
      this.clear();
      
      // alert( this.startdate.getDay + '/' +this.startdate.getMonth + '/' +this.startdate.getFullYear); 
      // alert( 'number: ' + this.mycur.parse("10"));
      // let bl: boolean;
      // bl =  this.emailval.parse('atulkulvegmail.com','');
      // alert(bl );

      //Create userform and apply Validation
      // alert(this.mydate1.parse( '2016-12-13T18:30:00.000Z'));
         

      this.userform = this.fb.group({
        'language_name':new FormControl('', Validators. required),
        'language_alias':new FormControl('', Validators. required),
      });



        //preload data Grid required 
        this.localService
      .getall()
      .subscribe(
         /* happy path */ p => this.languages=p,
         /* error path */ e => console.log( e),
         /* onComplete */ () => this.processdata());

         
        
  }
  processdata(){
    

  }
  populatedrp(){ //populate dropdowns on page load. by using push and SelectItem
    //console.log(this.drpvar.length);
        for(var i =0;i<this.drpvar.length;i++){
          //alert(this.drpvar[i].labeld + ' : '  + this.drpvar[i].valued);
           this.drplanguage.push({label:this.drpvar[i].labeld , value:this.drpvar[i].valued});
        }
        // alert(JSON.stringify(this.drplanguage));

  }

  //Dropdown change event capture
  drpchange(events1: any){
    // alert(events1.value);
  }

  //Just a method to call user form data on form submit
  get diagnostic() { return JSON.stringify(this.userform.value); }

 }
