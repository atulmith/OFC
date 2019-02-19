import { Component,OnInit } from '@angular/core';
import {FormGroup,FormControl,Validators,FormBuilder} from '@angular/forms';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import {MessagesModule,Message,Growl} from 'primeng/primeng';
import {PanelModule} from 'primeng/primeng';
import { ActivatedRoute, Router } from '@angular/router';
import {ButtonModule} from 'primeng/primeng';
import {TermsConditions} from './termscondition';
import {Dropdown1} from './dropdown1';
import {FileUpload} from './fileupload';
import {DataTableModule} from 'primeng/primeng';
import {DropdownModule} from 'primeng/primeng';


import { MyCurrencyPipe } from '../shared/pipes/first.pipe';
import { TermsConditionService } from '../shared/termscondition/index';

import {FileUploadModule} from 'primeng/primeng';
import {SelectItem} from 'primeng/primeng';
import { MyDateFormat } from '../shared/pipes/mydateformat.pipe';
import { EmailValidate } from '../shared/pipes/emailvalidate.pipe';
import { CustomValidator } from '../shared/validators/validator.directive';
import {BaseUrlService} from '../shared/baseurl/baseurl.service';
/**
 * This class represents the lazy loaded termsconditionComponent.
 */
@Component({
  moduleId: module.id,
  selector: 'sd-termscondition',
  templateUrl: 'termscondition.component.html',
  styleUrls: ['termscondition.component.css'],
  providers:[MyCurrencyPipe,MyDateFormat,EmailValidate,BaseUrlService]
})
export class TermsConditionComponent implements OnInit {
  //Form grop 
  userform: FormGroup;
  // Growl messege
  msgs: Message[]=[];

  //Declare: Data handling for Grid flow, form flow
  termsconditions: TermsConditions[]=[];
  submitted: boolean;
  termscondition: TermsConditions;
  selectedTermsConditionRow: TermsConditions;

   // Form data prefilled
   drpvar: Dropdown1[]=[];
   drptermscondition: SelectItem[]=[];
   startdate: Date;
   enddate: Date;

   //boolean value for Add new or Edit Mode
   newtermscondition: boolean;
   
  //  selectedtermscondition: string;
       
  //*** fileupload Declare ***
  //Client format for file upload
  uploadedFiles: any[] = [];
  //server format for file upload
  fileuploadarr: FileUpload[]=[];
  fileupload: FileUpload;

  mybaseurl:string;

  //Prepare data for new entry or initize data during form load by clearing data or presetting data
  clear(){
        this.newtermscondition=true;
        this.termscondition={
          termsconditions_id:'',
          termsconditions_title:'',
          termsconditions_description:'',
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
              private localService: TermsConditionService,
              private mycur: MyCurrencyPipe,
              private mydate1: MyDateFormat,
              private emailval: EmailValidate,
              private baseUrlservice:BaseUrlService
              ){
           this.mybaseurl=baseUrlservice.getBaseurl();     
          // drpop down can only be populated in constructor and not in nginit()
          // this.localService
          // .getselectdrptermscondition('hj')
          // .subscribe(
          //   /* happy path */ p =>this.drpvar=p,//alert( JSON.stringify( p)),
          //   /* error path */ e => console.log(e),
          //   /* onComplete */ () => this.populatedrp());//{this.mymethod(this.drpvar);});//this.msgs.push({severity:'info', summary:'Success', detail:'Form Update Successfully: ' + JSON.stringify( this.drpvar) + ' : ' + this.drpvar.length}));

    
  }
  onRowSelectTermsCondition(event: any){
         //Indicator for form is in Edit mode
         this.newtermscondition=false;
         //Copy of row selected
        //  this.termscondition=this.selectedRow;
         let tempproj: TermsConditions;
         tempproj = this.selectedTermsConditionRow;
         //Calling WS to get the selected data from server DB of the selected row
         
         //Calling WS to get the selected data from server DB of the selected row
        this.localService
      .getedit(tempproj.termsconditions_id)
      .subscribe(
         /* happy path */ p => this.termscondition=p,
         /* error path */ e => console.log( e),
         /* onComplete */ () => {this.aftercalldate();} );//console.log('done getselectEdittermscondition: ' + this.termscondition));

         
         
  }
  aftercalldate(){
    //  alert(JSON.stringify( this.termscondition));
    // alert(this.termscondition.termscondition_enddate);
    //      alert(new Date(Number(this.termscondition.termscondition_enddate) ));
    //      alert(new Date(Number(this.termscondition.termscondition_startdate) ));
    // this.startdate  = new Date(Number(this.termscondition.termscondition_startdate ));
    // this.enddate  = new Date(Number(this.termscondition.termscondition_enddate ));
  }

  

  // Date change event to format ngmodel to our format date and calling pipe 
  // startdatechange(){
  //   this.termscondition.projmile_startdate=this.mydate1.parse(this.termscondition.projmile_startdate)
  // }
  // enddatechange(){
  //   this.termscondition.projmile_enddate=this.mydate1.parse(this.termscondition.projmile_enddate)
  // }


  onSubmit(){
      //   alert(JSON.stringify(this.selectedRow));
        //alert(this.termscondition.termscondition_startdate);
        // this.termscondition.termscondition_startdate=this.mydate1.parse(this.startdate)
  
        // this.termscondition.termscondition_enddate=this.mydate1.parse(this.enddate)
        
        
        this.submitted = true;
        this.msgs = [];
        console.log(JSON.stringify(this.termscondition));
        this.msgs.push({severity:'info', summary:'Please wait', detail:'Form Submitted Successfully.. Please wait..'})
        
        //  console.log('onSubmit onRowSelect: ' + JSON.stringify (this.termscondition));
        //  console.log('onSubmit onRowSelect fileuploadarr: ' + JSON.stringify (this.fileuploadarr));

        if(this.newtermscondition){//Add new entry saving
           this.localService
          .insert(this.termscondition)
          .subscribe(
            /* happy path */ p => this.termsconditions = p,
            /* error path */ e => console.log(e),
            /* onComplete */ () => this.msgs.push({severity:'info', summary:'Success', detail:'Form Update Successfully'}));
        }
        else{ // update entry saving
          console.log('termscondition: ' + JSON.stringify( this.termscondition) + ' , f:' +  JSON.stringify( this.fileuploadarr));
          this.localService
          .update(this.termscondition)
          .subscribe(
            /* happy path */ p => this.termsconditions = p,
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
     this.userform = this.fb.group({'termsconditions_title':new FormControl('', Validators. required),'termsconditions_description':new FormControl('', Validators. required),});
        
        //preload data Grid required 
        this.localService
      .getall()
      .subscribe(
         /* happy path */ p => this.termsconditions=p,
         /* error path */ e => console.log( e),
         /* onComplete */ () => this.processdata());

         
        
  }
  processdata(){
    

  }
  

 

  

 }
