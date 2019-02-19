import { Component,OnInit } from '@angular/core';
import {FormGroup,FormControl,Validators,FormBuilder} from '@angular/forms';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import {MessagesModule,Message,Growl} from 'primeng/primeng';
import {PanelModule} from 'primeng/primeng';
import { ActivatedRoute, Router } from '@angular/router';
import {ButtonModule} from 'primeng/primeng';
import {PriceRange} from './pricerange';
import {Dropdown1} from './dropdown1';
import {FileUpload} from './fileupload';
import {DataTableModule} from 'primeng/primeng';
import {DropdownModule} from 'primeng/primeng';


import { MyCurrencyPipe } from '../shared/pipes/first.pipe';
import { PriceRangeService } from '../shared/pricerange/index';

import {FileUploadModule} from 'primeng/primeng';
import {SelectItem} from 'primeng/primeng';
import { MyDateFormat } from '../shared/pipes/mydateformat.pipe';
import { EmailValidate } from '../shared/pipes/emailvalidate.pipe';
import { CustomValidator } from '../shared/validators/validator.directive';
import {BaseUrlService} from '../shared/baseurl/baseurl.service';
/**
 * This class represents the lazy loaded pricerangeComponent.
 */
@Component({
  moduleId: module.id,
  selector: 'sd-pricerange',
  templateUrl: 'pricerange.component.html',
  styleUrls: ['pricerange.component.css'],
  providers:[MyCurrencyPipe,MyDateFormat,EmailValidate,BaseUrlService]
})
export class PricerangeComponent implements OnInit {
  //Form grop 
  userform: FormGroup;
  // Growl messege
  msgs: Message[]=[];

  //Declare: Data handling for Grid flow, form flow
  priceranges: PriceRange[]=[];
  submitted: boolean;
  pricerange: PriceRange;
  selectedRow: PriceRange;

   // Form data prefilled
   drpvar: Dropdown1[]=[];
   drppricerange: SelectItem[]=[];
   startdate: Date;
   enddate: Date;

   //boolean value for Add new or Edit Mode
   newpricerange: boolean;
   
  //  selectedpricerange: string;
       
  //*** fileupload Declare ***
  //Client format for file upload
  uploadedFiles: any[] = [];
  //server format for file upload
  fileuploadarr: FileUpload[]=[];
  fileupload: FileUpload;

  mybaseurl:string;

  //Prepare data for new entry or initize data during form load by clearing data or presetting data
  clear(){
        this.newpricerange=true;
        this.pricerange={
          pricerange_id:'',pricerange_name:'',pricerange_alias:'',pricerange_from:'',pricerange_to:'',createdate:'',modifieddate:'',status:''
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
              private localService: PriceRangeService,
              private mycur: MyCurrencyPipe,
              private mydate1: MyDateFormat,
              private emailval: EmailValidate,
              private baseUrlservice:BaseUrlService
              ){
           this.mybaseurl=baseUrlservice.getBaseurl();     
          // drpop down can only be populated in constructor and not in nginit()
          // this.localService
          // .getselectdrppricerange('hj')
          // .subscribe(
          //   /* happy path */ p =>this.drpvar=p,//alert( JSON.stringify( p)),
          //   /* error path */ e => console.log(e),
          //   /* onComplete */ () => this.populatedrp());//{this.mymethod(this.drpvar);});//this.msgs.push({severity:'info', summary:'Success', detail:'Form Update Successfully: ' + JSON.stringify( this.drpvar) + ' : ' + this.drpvar.length}));

    
  }
  onRowSelect(event: any){
         //Indicator for form is in Edit mode
         this.newpricerange=false;
         //Copy of row selected
        //  this.pricerange=this.selectedRow;
         let tempproj: PriceRange;
         tempproj = this.selectedRow;
         //Calling WS to get the selected data from server DB of the selected row
      //    this.localService
      // .getselectAllfilePricerange(tempproj.pricerange_id)
      // .subscribe(
      //    /* happy path */ p => this.fileuploadarr=p,
      //    /* error path */ e => console.log( e),
      //    /* onComplete */ () => console.log('done getselectAllfileuploadpricerange: ' + this.fileuploadarr));

        //  console.log('onRowSelect: ' + JSON.stringify (this.pricerange));
        //  console.log('onRowSelect fileuploadarr: ' + JSON.stringify (this.fileuploadarr));

         //Calling WS to get the selected data from server DB of the selected row
        this.localService
      .getedit(tempproj.pricerange_id)
      .subscribe(
         /* happy path */ p => this.pricerange=p,
         /* error path */ e => console.log( e),
         /* onComplete */ () => {this.aftercalldate();} );//console.log('done getselectEditpricerange: ' + this.pricerange));

         
         
  }
  aftercalldate(){
    //  alert(JSON.stringify( this.pricerange));
    // alert(this.pricerange.pricerange_enddate);
    //      alert(new Date(Number(this.pricerange.pricerange_enddate) ));
    //      alert(new Date(Number(this.pricerange.pricerange_startdate) ));
    // this.startdate  = new Date(Number(this.pricerange.pricerange_startdate ));
    // this.enddate  = new Date(Number(this.pricerange.pricerange_enddate ));
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
  //   this.pricerange.projmile_startdate=this.mydate1.parse(this.pricerange.projmile_startdate)
  // }
  // enddatechange(){
  //   this.pricerange.projmile_enddate=this.mydate1.parse(this.pricerange.projmile_enddate)
  // }


  onSubmit(){
      //   alert(JSON.stringify(this.selectedRow));
        //alert(this.pricerange.pricerange_startdate);
        // this.pricerange.pricerange_startdate=this.mydate1.parse(this.startdate)
  
        // this.pricerange.pricerange_enddate=this.mydate1.parse(this.enddate)
        
        this.onFinalFileUpload();
        this.submitted = true;
        this.msgs = [];
        console.log(JSON.stringify(this.pricerange));
        this.msgs.push({severity:'info', summary:'Please wait', detail:'Form Submitted Successfully.. Please wait..'})
        
        //  console.log('onSubmit onRowSelect: ' + JSON.stringify (this.pricerange));
        //  console.log('onSubmit onRowSelect fileuploadarr: ' + JSON.stringify (this.fileuploadarr));

        if(this.newpricerange){//Add new entry saving
           this.localService
          .insert(this.pricerange)
          .subscribe(
            /* happy path */ p => this.priceranges = p,
            /* error path */ e => console.log(e),
            /* onComplete */ () => this.msgs.push({severity:'info', summary:'Success', detail:'Form Update Successfully'}));
        }
        else{ // update entry saving
          console.log('pricerange: ' + JSON.stringify( this.pricerange) + ' , f:' +  JSON.stringify( this.fileuploadarr));
          this.localService
          .update(this.pricerange)
          .subscribe(
            /* happy path */ p => this.priceranges = p,
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
          'pricerange_name':new FormControl('', Validators. required),
          'pricerange_alias':new FormControl('', Validators. required),
          'pricerange_from':new FormControl('', Validators. required),
          'pricerange_to':new FormControl('', Validators. required),});

        
        //preload data Grid required 
        this.localService
      .getall()
      .subscribe(
         /* happy path */ p => this.priceranges=p,
         /* error path */ e => console.log( e),
         /* onComplete */ () => this.processdata());

         
        
  }
  processdata(){
    

  }
  populatedrp(){ //populate dropdowns on page load. by using push and SelectItem
    //console.log(this.drpvar.length);
        for(var i =0;i<this.drpvar.length;i++){
          //alert(this.drpvar[i].labeld + ' : '  + this.drpvar[i].valued);
           this.drppricerange.push({label:this.drpvar[i].labeld , value:this.drpvar[i].valued});
        }
        // alert(JSON.stringify(this.drppricerange));

  }

  //Dropdown change event capture
  drpchange(events1: any){
    // alert(events1.value);
  }

  //Just a method to call user form data on form submit
  get diagnostic() { return JSON.stringify(this.userform.value); }

 }
