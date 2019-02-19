import { Component,OnInit } from '@angular/core';
import {FormGroup,FormControl,Validators,FormBuilder} from '@angular/forms';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import {MessagesModule,Message,Growl} from 'primeng/primeng';
import {PanelModule} from 'primeng/primeng';
import { ActivatedRoute, Router } from '@angular/router';
import {ButtonModule} from 'primeng/primeng';
import {PrivacyPolicy} from './privacypolicy';
import {Dropdown1} from './dropdown1';
import {FileUpload} from './fileupload';
import {DataTableModule} from 'primeng/primeng';
import {DropdownModule} from 'primeng/primeng';
import {EditorModule,SharedModule} from 'primeng/primeng';


import { MyCurrencyPipe } from '../shared/pipes/first.pipe';
import { PrivacyPolicyService } from '../shared/privacypolicy/index';

import {FileUploadModule} from 'primeng/primeng';
import {SelectItem} from 'primeng/primeng';
import { MyDateFormat } from '../shared/pipes/mydateformat.pipe';
import { EmailValidate } from '../shared/pipes/emailvalidate.pipe';
import { CustomValidator } from '../shared/validators/validator.directive';
import {BaseUrlService} from '../shared/baseurl/baseurl.service';
import { DomSanitizer } from '@angular/platform-browser';
import { SecurityContext } from '@angular/core';

/**
 * This class represents the lazy loaded privacypolicyComponent.
 */
@Component({
  moduleId: module.id,
  selector: 'sd-privacypolicy',
  templateUrl: 'privacypolicy.component.html',
  styleUrls: ['privacypolicy.component.css'],
  providers:[MyCurrencyPipe,MyDateFormat,EmailValidate,BaseUrlService]
})
export class PrivacyPolicyComponent implements OnInit {
  //Form grop 
  userform: FormGroup;
  // Growl messege
  msgs: Message[]=[];

  //Declare: Data handling for Grid flow, form flow
  privacypolicys: PrivacyPolicy[]=[];
  submitted: boolean;
  privacypolicy: PrivacyPolicy;
  selectedPrivacyPolicyRow: PrivacyPolicy;

   // Form data prefilled
   drpvar: Dropdown1[]=[];
   drpprivacypolicy: SelectItem[]=[];
   startdate: Date;
   enddate: Date;

   //boolean value for Add new or Edit Mode
   newprivacypolicy: boolean;
   
  //  selectedprivacypolicy: string;
       
  //*** fileupload Declare ***
  //Client format for file upload
  uploadedFiles: any[] = [];
  //server format for file upload
  fileuploadarr: FileUpload[]=[];
  fileupload: FileUpload;

  mybaseurl:string;

  //Prepare data for new entry or initize data during form load by clearing data or presetting data
  clear(){
        this.newprivacypolicy=true;
        this.privacypolicy={
          privacypolicy_id:'',
          privacypolicy_title:'',
          privacypolicy_description:'',
          createdate:'',
          modifieddate:'',
          status:''
        }

      
      
      
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
              private localService: PrivacyPolicyService,
              private mycur: MyCurrencyPipe,
              private mydate1: MyDateFormat,
              private emailval: EmailValidate,
              private baseUrlservice:BaseUrlService,
              private _sanitizer: DomSanitizer
              ){
           this.mybaseurl=baseUrlservice.getBaseurl();     
          // drpop down can only be populated in constructor and not in nginit()
          // this.localService
          // .getselectdrpprivacypolicy('hj')
          // .subscribe(
          //   /* happy path */ p =>this.drpvar=p,//alert( JSON.stringify( p)),
          //   /* error path */ e => console.log(e),
          //   /* onComplete */ () => this.populatedrp());//{this.mymethod(this.drpvar);});//this.msgs.push({severity:'info', summary:'Success', detail:'Form Update Successfully: ' + JSON.stringify( this.drpvar) + ' : ' + this.drpvar.length}));

    
  }
  onRowSelectPrivacyPolicy(event: any){
         //Indicator for form is in Edit mode
         this.newprivacypolicy=false;
         //Copy of row selected
        //  this.privacypolicy=this.selectedRow;
         let tempproj: PrivacyPolicy;
         tempproj = this.selectedPrivacyPolicyRow;
         //Calling WS to get the selected data from server DB of the selected row
         
         //Calling WS to get the selected data from server DB of the selected row
        this.localService
      .getedit(tempproj.privacypolicy_id)
      .subscribe(
         /* happy path */ p => this.privacypolicy=p,
         /* error path */ e => console.log( e),
         /* onComplete */ () => {this.aftercalldate();} );//console.log('done getselectEditprivacypolicy: ' + this.privacypolicy));

         
         
  }
  aftercalldate(){
    //  alert(JSON.stringify( this.privacypolicy));
    // alert(this.privacypolicy.privacypolicy_enddate);
    //      alert(new Date(Number(this.privacypolicy.privacypolicy_enddate) ));
    //      alert(new Date(Number(this.privacypolicy.privacypolicy_startdate) ));
    // this.startdate  = new Date(Number(this.privacypolicy.privacypolicy_startdate ));
    // this.enddate  = new Date(Number(this.privacypolicy.privacypolicy_enddate ));
  }
 
  escapeHtml(unsafe:any) {
    return unsafe.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
                 .replace(/"/g, "&quot;").replace(/'/g, "&#039;");
  }
  

  // Date change event to format ngmodel to our format date and calling pipe 
  // startdatechange(){
  //   this.privacypolicy.projmile_startdate=this.mydate1.parse(this.privacypolicy.projmile_startdate)
  // }
  // enddatechange(){
  //   this.privacypolicy.projmile_enddate=this.mydate1.parse(this.privacypolicy.projmile_enddate)
  // }


  onSubmit(){
      //   alert(JSON.stringify(this.selectedRow));
        //alert(this.privacypolicy.privacypolicy_startdate);
        // this.privacypolicy.privacypolicy_startdate=this.mydate1.parse(this.startdate)
  
        // this.privacypolicy.privacypolicy_enddate=this.mydate1.parse(this.enddate)
        
        
        this.submitted = true;
        this.msgs = [];
        //let desc=this._sanitizer.sanitize(SecurityContext.HTML, this.privacypolicy.privacypolicy_description);
        // let desc=this.escapeHtml(this.privacypolicy.privacypolicy_description);
        
        // this.privacypolicy.privacypolicy_description=desc;

        console.log(JSON.stringify(this.privacypolicy));
        this.msgs.push({severity:'info', summary:'Please wait', detail:'Form Submitted Successfully.. Please wait..'})
        
        //  console.log('onSubmit onRowSelect: ' + JSON.stringify (this.privacypolicy));
        //  console.log('onSubmit onRowSelect fileuploadarr: ' + JSON.stringify (this.fileuploadarr));

        if(this.newprivacypolicy){//Add new entry saving
           this.localService
          .insert(this.privacypolicy)
          .subscribe(
            /* happy path */ p => this.privacypolicys = p,
            /* error path */ e => console.log(e),
            /* onComplete */ () => this.msgs.push({severity:'info', summary:'Success', detail:'Form Update Successfully'}));
        }
        else{ // update entry saving
          console.log('privacypolicy: ' + JSON.stringify( this.privacypolicy) + ' , f:' +  JSON.stringify( this.fileuploadarr));
          this.localService
          .update(this.privacypolicy)
          .subscribe(
            /* happy path */ p => this.privacypolicys = p,
            /* error path */ e => console.log(e),
            /* onComplete */ () => this.msgs.push({severity:'info', summary:'Success', detail:'Form Update Successfully'}));
        }
        this.clear();
          this.submitted = true;
          this.msgs = [];
          this.msgs.push({severity:'info', summary:'Success', detail:'Form Update Successfully'});
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
     this.userform = this.fb.group(
       {
         'privacypolicy_title':new FormControl('', Validators. required),
         'privacypolicy_description':new FormControl('', Validators. required),
        });
        
        //preload data Grid required 
        this.localService
      .getall()
      .subscribe(
         /* happy path */ p => this.privacypolicys=p,
         /* error path */ e => console.log( e),
         /* onComplete */ () => this.processdata());

         
        
  }
  processdata(){
    

  }
  

 

  

 }
