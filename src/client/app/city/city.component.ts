import { Component,OnInit } from '@angular/core';
import {FormGroup,FormControl,Validators,FormBuilder} from '@angular/forms';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import {MessagesModule,Message,Growl} from 'primeng/primeng';
import {PanelModule} from 'primeng/primeng';
import { ActivatedRoute, Router } from '@angular/router';
import {ButtonModule} from 'primeng/primeng';
import {City} from './city';
import {Citys} from './citys';
import {State} from '../state/state';
import {Dropdown1} from './dropdown1';
import {FileUpload} from './fileupload';
import {DataTableModule} from 'primeng/primeng';
import {DropdownModule} from 'primeng/primeng';
import {InputTextareaModule} from 'primeng/primeng';

import { MyCurrencyPipe } from '../shared/pipes/first.pipe';
import { CityService } from '../shared/city/index';

import {FileUploadModule} from 'primeng/primeng';
import {SelectItem} from 'primeng/primeng';
import { MyDateFormat } from '../shared/pipes/mydateformat.pipe';
import { EmailValidate } from '../shared/pipes/emailvalidate.pipe';
import { CustomValidator } from '../shared/validators/validator.directive';
/**
 * This class represents the lazy loaded cityComponent.
 */
@Component({
  moduleId: module.id,
  selector: 'sd-city',
  templateUrl: 'city.component.html',
  styleUrls: ['city.component.css'],
  providers:[MyCurrencyPipe,MyDateFormat,EmailValidate,CityService]
})
export class CityComponent implements OnInit {
  //Form grop 
  userform: FormGroup;
  stateForm: FormGroup;
  // Growl messege
  msgs: Message[]=[];

  //Declare: Data handling for Grid flow, form flow
  citys: Citys[]=[];
  selectedcitysRow:Citys;

  states: State[]=[];
  submitted: boolean;
  city: City;
  selectedRow: City;

  displayDialog: boolean;
  state: State;
  selectedStateRow: State;
   selectedState: State;
   // Form data prefilled
   drpvar: Dropdown1[]=[];
  
   drpvarState: Dropdown1[]=[];
   drpStateId: SelectItem[]=[];

   drpvarCountry: Dropdown1[]=[];
   drpCountryId: SelectItem[]=[];

  ngModelcountryId: string;
   startdate: Date;
   enddate: Date;

   state_city: string[] = [];
   checked: boolean = false;
   //boolean value for Add new or Edit Mode
   newcity: boolean;
   newState: boolean;
  //  selectedcity: string;
       
  //*** fileupload Declare ***
  //Client format for file upload
  uploadedFiles: any[] = [];
  //server format for file upload
  fileuploadarr: FileUpload[]=[];
  fileupload: FileUpload;

  //Prepare data for new entry or initize data during form load by clearing data or presetting data
  clear(){
        this.newcity=true;
        this.city={
                city_id:'',
                city_name:'',
                city_aliasname:'',
                state_id:'1'
            
               
     };

     this.state={
      
      state_id:'1',
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
              private localService: CityService,
              private mycur: MyCurrencyPipe,
              private mydate1: MyDateFormat,
              private emailval: EmailValidate
              ){

       //this.populatedrp();
       
      /*this.localService.getCountry('hj').subscribe(p =>this.drpCountryId=p,e => console.log(e),() => console.log(this.drpCountryId));*/
      this.localService.getCountry('hj').subscribe(p =>{this.drpCountryId=p;this.drpCountryId.unshift({label:"Select" , value:"1"} )},e => console.log(e),() => console.log(this.drpCountryId));

    
  }
  onRowSelect(event: any){
         //Indicator for form is in Edit mode
         this.newcity=false;
         //Copy of row selected
        // this.city=this.selectedRow;
        
         let tempcitys:Citys;
         tempcitys=this.selectedcitysRow;
      
       this.ngModelcountryId= tempcitys.country_id;
       /*this.localService.getState(this.ngModelcountryId).subscribe(p =>this.drpStateId=p,e => console.log(e),() => console.log(this.drpStateId));*/
       this.localService.getState(this.ngModelcountryId).subscribe(p =>{this.drpStateId=p;this.drpStateId.unshift({label:"Select" , value:"1"} )},e => console.log(e),() => console.log(this.drpStateId));
       this.localService.getedit(tempcitys.city_id).subscribe(
         /* happy path */ p => this.city=p,
         /* error path */ e => console.log( e),
         /* onComplete */ () => this.aftercalldate() );//console.log('done getselectEditCity: ' + this.city));

         
         
  }

  onStateRowSelected(event: any){
       this.newState = false;
        this.state = this.cloneState(event.data);
        this.localService.getall()
          .subscribe(p => this.citys = p, e => console.log(e), () => this.mymethod()); 
        
        this.displayDialog = true;
          
  }


   cloneState(c: any):State {
        let state:any = this.state;
        for(let prop in c) {
            state[prop] = c[prop];
        }
        return state;
    }
    

     mymethod(){
      this.drpStateId=[];
   // alert(this.drpvarCity.length);
    this.drpStateId.push({label:'State' , value:'0'});
    //this.drpStateId.push({label:'India' , value:'1'});
        for(var i =0;i<this.drpvarState.length;i++){
         
           this.drpStateId.push({label:this.drpvarState[i].labeld , value:this.drpvarState[i].valued});
        }
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

  // Date change event to format ngmodel to our format date and calling pipe 
  // startdatechange(){
  //   this.city.city_startdate=this.mydate1.parse(this.city.city_startdate)
  // }
  // enddatechange(){
  //   this.city.city_enddate=this.mydate1.parse(this.city.city_enddate)
  // }


  onSubmit(){
    
        this.onFinalFileUpload();
        this.submitted = true;
        this.msgs = [];
        console.log(JSON.stringify(this.city));
        this.msgs.push({severity:'info', summary:'Please wait', detail:'Form Submitted Successfully.. Please wait..'})
        
        console.log('onSubmit : ' + JSON.stringify (this.city));
        //  console.log('onSubmit onRowSelect fileuploadarr: ' + JSON.stringify (this.fileuploadarr));

        if(this.newcity){//Add new entry saving
           this.localService.insert(this.city)
          .subscribe(
            /* happy path */ p => this.citys = p,
            /* error path */ e => console.log(e),
            /* onComplete */ () => this.msgs.push({severity:'info', summary:'Success', detail:'Form Update Successfully'}));
        }
        else{ // update entry saving
          console.log('MILESTONE: ' + JSON.stringify( this.city) + ' , f:' +  JSON.stringify( this.fileuploadarr));
          this.localService
          .update(this.city)
          .subscribe(
            /* happy path */ p => this.citys = p,
            /* error path */ e => console.log(e),
            /* onComplete */ () => this.msgs.push({severity:'info', summary:'Success', detail:'Form Update Successfully'}));
        }
         /* this.submitted = true;
          this.msgs = [];
          this.msgs.push({severity:'info', summary:'Success', detail:'Form Update Successfully'});



           this.citys.push(this.city);*/
 //   alert(JSON.stringify(this.states));
    this.clear();   
  }

 
   onSubmitState(){
      
   // alert(JSON.stringify(this.state));
    this.states.push(this.state);
 //   alert(JSON.stringify(this.states));
    this.clearState();    
         
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
        'city_name':new FormControl('', Validators. required),
      'city_aliasname':new FormControl('', Validators. required),
      'state_id':new FormControl('', Validators. required),
       'country_id':new FormControl('', Validators. required),
    });

        //preload data Grid required 
        this.localService
      .getall()
      .subscribe(
         /* happy path */ p => this.citys=p,
         /* error path */ e => console.log( e),
         /* onComplete */ () => this.processdata());

         
        
  }
  processdata(){
    

  }


  populateStates(events1: any){
    //alert(events1.value);
    this.ngModelcountryId=events1.value;
    /*this.localService.getState(this.ngModelcountryId).subscribe(p =>this.drpStateId=p,e => console.log(e),() => console.log(this.drpStateId));*/
    this.localService.getState(this.ngModelcountryId).subscribe(p =>{this.drpStateId=p;this.drpStateId.unshift({label:"Select" , value:"1"} )},e => console.log(e),() => console.log(this.drpStateId));
  }
  
  
  
  populatedrp(){ //populate dropdowns on page load. by using push and SelectItem
   
        this.drpStateId.push({label:"India" , value:"India"});
        this.drpStateId.push({label:"USA" , value:"USA"});
        this.drpStateId.push({label:"UK" , value:"UK"});
        
        // alert(JSON.stringify(this.drpcity));

  }

/*   save() 
   {

     alert(this.findSelectedStateIndex());
      let a= this.drpCityId.find(p=>p.value===this.state.city_id);
        alert("City Name is="+a.label);
        this.state.city_name=a.label;

        if(this.newState)
            this.states.push(this.state);
        else
            this.states[this.findSelectedStateIndex()] = this.state;
          //state.city_id
        
        this. clearState();
        this.displayDialog = false;
      
    }
    */
    delete() 
    {
        alert(this.findSelectedStateIndex());
        this.states.splice(this.findSelectedStateIndex(), 1);
         this.clearState();
        this.displayDialog = false;
    }    
    

 findSelectedStateIndex(): number {
        return this.states.indexOf(this.selectedState);
    }
  //Dropdown change event capture
  drpchange(events1: any){
    //alert(events1.value);
  }

  //Just a method to call user form data on form submit
  get diagnostic() { return JSON.stringify(this.userform.value); }

 }
