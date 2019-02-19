import { Component,OnInit } from '@angular/core';
import {FormGroup,FormControl,Validators,FormBuilder} from '@angular/forms';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import {MessagesModule,Message,Growl} from 'primeng/primeng';
import {PanelModule} from 'primeng/primeng';
import { ActivatedRoute, Router } from '@angular/router';
import {ButtonModule} from 'primeng/primeng';
import {PopularServiceHomepage} from './popularservices';
import {Dropdown1} from './dropdown1';
import {FileUpload} from './fileupload';
import {DataTableModule} from 'primeng/primeng';
import {DropdownModule} from 'primeng/primeng';


import { MyCurrencyPipe } from '../shared/pipes/first.pipe';
import { PopularServices } from '../shared/popularservices/index';

import {FileUploadModule} from 'primeng/primeng';
import {SelectItem} from 'primeng/primeng';
import { MyDateFormat } from '../shared/pipes/mydateformat.pipe';
import { EmailValidate } from '../shared/pipes/emailvalidate.pipe';
import { CustomValidator } from '../shared/validators/validator.directive';
import {BaseUrlService} from '../shared/baseurl/baseurl.service';
/**
 * This class represents the lazy loaded popularservicehomepageComponent.
 */
@Component({
  moduleId: module.id,
  selector: 'sd-popularservice',
  templateUrl: 'popularservices.component.html',
  styleUrls: ['popularservices.component.css'],
  providers:[MyCurrencyPipe,MyDateFormat,EmailValidate,BaseUrlService]
})
export class PopularServicesComponent implements OnInit {
  //Form grop 
  userform: FormGroup;
  // Growl messege
  msgs: Message[]=[];

  //Declare: Data handling for Grid flow, form flow
  popularservicehomepages: PopularServiceHomepage[]=[];
  submitted: boolean;
  popularservice: PopularServiceHomepage;
  selectedPopularServicesRow: PopularServiceHomepage;

   // Form data prefilled
   drpvar: Dropdown1[]=[];
   drppopularservicehomepage: SelectItem[]=[];
   startdate: Date;
   enddate: Date;

   //boolean value for Add new or Edit Mode
   newpopularservicehomepage: boolean;
   
  //  selectedpopularservicehomepage: string;
       
  //*** fileupload Declare ***
  //Client format for file upload
  uploadedFiles: any[] = [];
  //server format for file upload
  fileuploadarr: FileUpload[]=[];
  fileupload: FileUpload;

  mybaseurl:string;

  //as done on 28 jan 2017 by Mandar 
  ngModelMaincatId: string;
  drpMaincatId: SelectItem[]=[];

  //Prepare data for new entry or initize data during form load by clearing data or presetting data
  clear(){
        this.newpopularservicehomepage=true;
        this.popularservice={
          popularservice_id:'',
          popularservice_srno:'',
          maincat_id:'',
          createdate:'',
          modifieddate:'',
          status:'',
          popularservice_title:''}

      
      
      
    this.fileupload={
      fileName: '',
      fileType: '',
      filePath: '',
      fileStatus: '',
      uploadfile_filename: ''
    }

    this.fileuploadarr=[];
  }

  // constructor initiaze of all necessary variable and objects
  constructor(private fb: FormBuilder,
              private route: ActivatedRoute,
              private router: Router,
              private localService: PopularServices,
              private mycur: MyCurrencyPipe,
              private mydate1: MyDateFormat,
              private emailval: EmailValidate,
              private baseUrlservice:BaseUrlService
              ){
           this.mybaseurl=baseUrlservice.getBaseurl();     
          // drpop down can only be populated in constructor and not in nginit()
          // this.localService
          // .getselectdrppopularservicehomepage('hj')
          // .subscribe(
          //   /* happy path */ p =>this.drpvar=p,//alert( JSON.stringify( p)),
          //   /* error path */ e => console.log(e),
          //   /* onComplete */ () => this.populatedrp());//{this.mymethod(this.drpvar);});//this.msgs.push({severity:'info', summary:'Success', detail:'Form Update Successfully: ' + JSON.stringify( this.drpvar) + ' : ' + this.drpvar.length}));
          this.localService.getMaincat('hj').subscribe(p =>{this.drpMaincatId=p;this.drpMaincatId.unshift({label:"Select" , value:"1"} )},e => console.log(e),() => console.log(this.drpMaincatId));

    
  }
  //as done on 30 jan 2017 by Mandar
  onRowSelectPopularServices(event: any){
         //Indicator for form is in Edit mode
         this.newpopularservicehomepage=false;
         //Copy of row selected
        //  this.popularservice=this.selectedRow;
         let tempproj: PopularServiceHomepage;
         tempproj = this.selectedPopularServicesRow;
         //Calling WS to get the selected data from server DB of the selected row
         this.localService
      .getselectAllfilePopularService(tempproj.popularservice_id)
      .subscribe(
         /* happy path */ p => this.fileuploadarr=p,
         /* error path */ e => console.log( e),
         /* onComplete */ () => console.log('done getselectAllfileuploadpopularservicehomepage: ' + this.fileuploadarr));

        //  console.log('onRowSelect: ' + JSON.stringify (this.popularservice));
        //  console.log('onRowSelect fileuploadarr: ' + JSON.stringify (this.fileuploadarr));

         //Calling WS to get the selected data from server DB of the selected row
        this.localService
      .getedit(tempproj.popularservice_id)
      .subscribe(
         /* happy path */ p => this.popularservice=p,
         /* error path */ e => console.log( e),
         /* onComplete */ () => {
           //this.aftercalldate();
          } 
          );//console.log('done getselectEditpopularservicehomepage: ' + this.popularservice));

         
         
   }
  // aftercalldate(){
  //    alert(JSON.stringify( this.popularservice));
  //   alert(this.popularservice.popularservicehomepage_enddate);
  //        alert(new Date(Number(this.popularservice.popularservicehomepage_enddate) ));
  //        alert(new Date(Number(this.popularservice.popularservicehomepage_startdate) ));
  //   this.startdate  = new Date(Number(this.popularservice.popularservicehomepage_startdate ));
  //   this.enddate  = new Date(Number(this.popularservice.popularservicehomepage_enddate ));
  // }

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

  // Date change event to format ngmodel to our format date and calling pipe 
  // startdatechange(){
  //   this.popularservice.projmile_startdate=this.mydate1.parse(this.popularservice.projmile_startdate)
  // }
  // enddatechange(){
  //   this.popularservice.projmile_enddate=this.mydate1.parse(this.popularservice.projmile_enddate)
  // }


  onSubmit(){
      //   alert(JSON.stringify(this.selectedRow));
        //alert(this.popularservice.popularservicehomepage_startdate);
        // this.popularservice.popularservicehomepage_startdate=this.mydate1.parse(this.startdate)
  
        // this.popularservice.popularservicehomepage_enddate=this.mydate1.parse(this.enddate)
        
        this.onFinalFileUpload();
        this.submitted = true;
        this.msgs = [];
        console.log(JSON.stringify(this.popularservice));
        this.msgs.push({severity:'info', summary:'Please wait', detail:'Form Submitted Successfully.. Please wait..'})
        
        //  console.log('onSubmit onRowSelect: ' + JSON.stringify (this.popularservice));
        //  console.log('onSubmit onRowSelect fileuploadarr: ' + JSON.stringify (this.fileuploadarr));

        if(this.newpopularservicehomepage){//Add new entry saving
           this.localService
          .insert(this.popularservice,this.fileuploadarr)
          .subscribe(
            /* happy path */ p => this.popularservicehomepages = p,
            /* error path */ e => console.log(e),
            /* onComplete */ () => this.msgs.push({severity:'info', summary:'Success', detail:'Form Update Successfully'}));
        }
        else{ // update entry saving
          console.log('popularservice: ' + JSON.stringify( this.popularservice) + ' , f:' +  JSON.stringify( this.fileuploadarr));
          this.localService
          .update(this.popularservice,this.fileuploadarr)
          .subscribe(
            /* happy path */ p => this.popularservicehomepages = p,
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
  //alert(event.files);
  this.uploadedFiles=[];
  for(let file of event.files) {
          
          this.uploadedFiles.push(file);
          //break;
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
      
      // alert( this.startdate.getDay + '/' +this.startdate.getMonth + '/' +this.startdate.getFullYear); 
      // alert( 'number: ' + this.mycur.parse("10"));
      // let bl: boolean;
      // bl =  this.emailval.parse('atulkulvegmail.com','');
      // alert(bl );

      //Create userform and apply Validation
      // alert(this.mydate1.parse( '2016-12-13T18:30:00.000Z'));
      this.userform = this.fb.group(
        {
          'popularservice_srno':new FormControl('', Validators. required),
          'maincat_id':new FormControl('', Validators. required),
          'popularservice_title':new FormControl('', Validators. required),
        });
        
        //preload data Grid required 
        this.localService
      .getall()
      .subscribe(
         /* happy path */ p => this.popularservicehomepages=p,
         /* error path */ e => console.log( e),
         /* onComplete */ () => this.processdata());

         
        
  }
  processdata(){
    

  }
  populatedrp(){ //populate dropdowns on page load. by using push and SelectItem
    //console.log(this.drpvar.length);
        for(var i =0;i<this.drpvar.length;i++){
          //alert(this.drpvar[i].labeld + ' : '  + this.drpvar[i].valued);
           this.drppopularservicehomepage.push({label:this.drpvar[i].labeld , value:this.drpvar[i].valued});
        }
        // alert(JSON.stringify(this.drppopularservicehomepage));

  }

  //Dropdown change event capture
  drpchange(events1: any){
    alert(events1.value);
  }

  //Just a method to call user form data on form submit
  get diagnostic() { return JSON.stringify(this.userform.value); }

 }
