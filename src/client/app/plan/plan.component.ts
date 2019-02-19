import { Component,OnInit } from '@angular/core';
import {FormGroup,FormControl,Validators,FormBuilder} from '@angular/forms';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import {MessagesModule,Message,Growl} from 'primeng/primeng';
import {PanelModule} from 'primeng/primeng';
import { ActivatedRoute, Router } from '@angular/router';
import {ButtonModule} from 'primeng/primeng';
import {Plan} from './plan';

import {Dropdown1} from './dropdown1';
import {FileUpload} from './fileupload';
import {DataTableModule} from 'primeng/primeng';
import {DropdownModule} from 'primeng/primeng';
import {InputTextareaModule} from 'primeng/primeng';

import { MyCurrencyPipe } from '../shared/pipes/first.pipe';
import { PlanService } from '../shared/plan/index';

import {FileUploadModule} from 'primeng/primeng';
import {SelectItem} from 'primeng/primeng';
import { MyDateFormat } from '../shared/pipes/mydateformat.pipe';
import { EmailValidate } from '../shared/pipes/emailvalidate.pipe';
import { CustomValidator } from '../shared/validators/validator.directive';
/**
 * This class represents the lazy loaded planComponent.
 */
@Component({
  moduleId: module.id,
  selector: 'sd-plan',
  templateUrl: 'plan.component.html',
  styleUrls: ['plan.component.css'],
  providers:[MyCurrencyPipe,MyDateFormat,EmailValidate,PlanService]
})
export class PlanComponent implements OnInit {
  //Form grop 
  userform: FormGroup;
  countryForm: FormGroup;
  // Growl messege
  msgs: Message[]=[];

  //Declare: Data handling for Grid flow, form flow
  
  submitted: boolean;
  plan: Plan;
  selectedPlansRow: Plan;
  plangrid: Plan[]=[];
  displayDialog: boolean;
  
   drpvar: Dropdown1[]=[];
  
   drpvarCountry: Dropdown1[]=[];
   drpCountryId: SelectItem[]=[];
   startdate: Date;
   enddate: Date;

   country_city: string[] = [];
   checked: boolean = false;
   //boolean value for Add new or Edit Mode
   newplan: boolean;
   newCountry: boolean;
  //  selectedplan: string;
       
  //*** fileupload Declare ***
  //Client format for file upload
  uploadedFiles: any[] = [];
  //server format for file upload
  fileuploadarr: FileUpload[]=[];
  fileupload: FileUpload;

  //Prepare data for new entry or initize data during form load by clearing data or presetting data
  clear(){
        this.newplan=true;
        this.plan={
              plan_id:'',
              plan_name:'',
              plan_bidsnos:'',
              plan_feespercentage:'',
              plan_nosofcategories:'',
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
              private localService: PlanService,
              private mycur: MyCurrencyPipe,
              private mydate1: MyDateFormat,
              private emailval: EmailValidate
              ){

      

    
  }
  onRowSelect(event: any){
        
           this.newplan=false;
         //this.contact = this.cloneCar(event.data);
         this.plan=this.selectedPlansRow;
         
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

  // Date change event to format ngmodel to our format date and calling pipe 
  // startdatechange(){
  //   this.plan.plan_startdate=this.mydate1.parse(this.plan.plan_startdate)
  // }
  // enddatechange(){
  //   this.plan.plan_enddate=this.mydate1.parse(this.plan.plan_enddate)
  // }


  onSubmit(){
    
        this.onFinalFileUpload();
        this.submitted = true;
        this.msgs = [];
        console.log(JSON.stringify(this.plan));
        this.msgs.push({severity:'info', summary:'Please wait', detail:'Form Submitted Successfully.. Please wait..'})
        
        //  console.log('onSubmit onRowSelect: ' + JSON.stringify (this.plan));
        //  console.log('onSubmit onRowSelect fileuploadarr: ' + JSON.stringify (this.fileuploadarr));

        if(this.newplan){//Add new entry saving
           this.localService.insert(this.plan)
          .subscribe(
            /* happy path */ p => this.plangrid = p,
            /* error path */ e => console.log(e),
            /* onComplete */ () => this.msgs.push({severity:'info', summary:'Success', detail:'Form Update Successfully'}));
        }
        else{ // update entry saving
          console.log('MILESTONE: ' + JSON.stringify( this.plan) + ' , f:' +  JSON.stringify( this.fileuploadarr));
          this.localService
          .update(this.plan)
          .subscribe(
            /* happy path */ p => this.plangrid = p,
            /* error path */ e => console.log(e),
            /* onComplete */ () => this.msgs.push({severity:'info', summary:'Success', detail:'Form Update Successfully'}));
        }
         /* this.submitted = true;
          this.msgs = [];
          this.msgs.push({severity:'info', summary:'Success', detail:'Form Update Successfully'});



           this.plangrid.push(this.plan);*/
 //   alert(JSON.stringify(this.countrys));
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
      'plan_name':new FormControl('', Validators. required),
      'plan_bidsnos':new FormControl('', Validators.required),
      'plan_feespercentage':new FormControl('', Validators. required),
      'plan_nosofcategories':new FormControl('', Validators.required),});
        //preload data Grid required 
        this.localService
      .getall()
      .subscribe(
         /* happy path */ p => this.plangrid=p,
         /* error path */ e => console.log( e),
         /* onComplete */ () => this.processdata());

         
        
  }
  processdata(){
    

  }
  populatedrp(){ //populate dropdowns on page load. by using push and SelectItem
   
        this.drpCountryId.push({label:"India" , value:"India"});
        this.drpCountryId.push({label:"USA" , value:"USA"});
        this.drpCountryId.push({label:"UK" , value:"UK"});
        
        // alert(JSON.stringify(this.drpplan));

  }

/*   save() 
   {

     alert(this.findSelectedCountryIndex());
      let a= this.drpPlanId.find(p=>p.value===this.country.plan_id);
        alert("Plan Name is="+a.label);
        this.country.plan_name=a.label;

        if(this.newCountry)
            this.countrys.push(this.country);
        else
            this.countrys[this.findSelectedCountryIndex()] = this.country;
          //country.plan_id
        
        this. clearCountry();
        this.displayDialog = false;
      
    }
    */
   
  drpchange(events1: any){
    //alert(events1.value);
  }

  //Just a method to call user form data on form submit
  get diagnostic() { return JSON.stringify(this.userform.value); }

 }
