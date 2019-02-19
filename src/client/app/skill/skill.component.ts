import { Component,OnInit } from '@angular/core';
import {FormGroup,FormControl,Validators,FormBuilder} from '@angular/forms';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import {MessagesModule,Message,Growl} from 'primeng/primeng';
import {PanelModule} from 'primeng/primeng';
import { ActivatedRoute, Router } from '@angular/router';
import {ButtonModule} from 'primeng/primeng';
import {Skill} from './skill';
import {SkillGrid} from './skillGrid';
import {Subcategory} from '../subcategory/subcategory';
import {Dropdown1} from './dropdown1';
import {FileUpload} from './fileupload';
import {DataTableModule} from 'primeng/primeng';
import {DropdownModule} from 'primeng/primeng';
import {InputTextareaModule} from 'primeng/primeng';

import { MyCurrencyPipe } from '../shared/pipes/first.pipe';
import { SkillService } from '../shared/skill/index';

import {FileUploadModule} from 'primeng/primeng';
import {SelectItem} from 'primeng/primeng';
import { MyDateFormat } from '../shared/pipes/mydateformat.pipe';
import { EmailValidate } from '../shared/pipes/emailvalidate.pipe';
import { CustomValidator } from '../shared/validators/validator.directive';
/**
 * This class represents the lazy loaded skillComponent.
 */
@Component({
  moduleId: module.id,
  selector: 'sd-skill',
  templateUrl: 'skill.component.html',
  styleUrls: ['skill.component.css'],
  providers:[MyCurrencyPipe,MyDateFormat,EmailValidate,SkillService]
})
export class SkillComponent implements OnInit {
  //Form grop 
  userform: FormGroup;
  subcategoryForm: FormGroup;
  // Growl messege
  msgs: Message[]=[];

  //Declare: Data handling for Grid flow, form flow
  skillGrid: SkillGrid[]=[];
  selectedskillgridRow:SkillGrid;

  submitted: boolean;
  skill: Skill;
  selectedRow: Skill;

  displayDialog: boolean;
  subcategory: Subcategory;
  selectedSubcategoryRow: Subcategory;
  selectedSubcategory: Subcategory;

  drpMaincatId: SelectItem[]=[];
  drpSubcatId: SelectItem[]=[];
 
  ngModelMaincatId: string;
  ngModelSubcategoryId: string;
  
   startdate: Date;
   enddate: Date;

   checked: boolean = false;
   //boolean value for Add new or Edit Mode
   newskill: boolean;
   newSubcategory: boolean;
  //  selectedskill: string;
       
  //*** fileupload Declare ***
  //Client format for file upload
  uploadedFiles: any[] = [];
  //server format for file upload
  fileuploadarr: FileUpload[]=[];
  fileupload: FileUpload;

  //Prepare data for new entry or initize data during form load by clearing data or presetting data
  clear(){
        this.newskill=true;
        this.skill={
              skill_id:'',
              skill_name:'',
              skill_alias:'',
              subcat_id:'',
              createdate:'',
              modifieddate:'',
              status:''
               
     };

     this.subcategory={
      
      subcat_id: '',
      subcat_name: '',
      subcat_aliasname: '',
      maincat_id: '1',
      createdate: '',
      modifieddate: '',
      status: ''

     };
      
      
      
    this.fileupload={
      fileName: '',
      fileType: '',
      filePath: '',
      fileStatus: '',
      uploadfile_filename: ''
    }
  }


  clearSubcategory(){
       
      this.subcategory={
      subcat_id: '',
      subcat_name: '',
      subcat_aliasname: '',
      maincat_id: '1',
      createdate: '',
      modifieddate: '',
      status: ''

     };
      
      
    
  }

  // constructor initiaze of all necessary variable and objects
  constructor(private fb: FormBuilder,
              private route: ActivatedRoute,
              private router: Router,
              private localService: SkillService,
              private mycur: MyCurrencyPipe,
              private mydate1: MyDateFormat,
              private emailval: EmailValidate
              ){

       this.localService.getMaincat('hj').subscribe(p =>{this.drpMaincatId=p;this.drpMaincatId.unshift({label:"Select" , value:"1"} )},e => console.log(e),() => console.log(this.drpMaincatId));
    

    
  }
  onskillgridRowSelected(event: any){
         //Indicator for form is in Edit mode
         this.newskill=false;
         //Copy of row selected
        // this.skill=this.selectedRow;
        
         let tempskillGrid:SkillGrid;
         tempskillGrid=this.selectedskillgridRow;
      
       this.ngModelMaincatId= tempskillGrid.maincat_id;
       this.ngModelSubcategoryId=tempskillGrid.subcat_id;
       
       this.localService.getSubcategory(this.ngModelMaincatId).subscribe(p =>{this.drpSubcatId=p;this.drpSubcatId.unshift({label:"Select" , value:"1"} )},e => console.log(e),() => console.log(this.drpSubcatId));
    

        this.localService.getedit(tempskillGrid.skill_id).subscribe(
         /* happy path */ p => this.skill=p,
         /* error path */ e => console.log( e),
         /* onComplete */ () => this.aftercalldate() );//console.log('done getselectEditSkill: ' + this.skill));

         
         
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
        console.log(JSON.stringify(this.skill));
        this.msgs.push({severity:'info', summary:'Please wait', detail:'Form Submitted Successfully.. Please wait..'})
        
        if(this.newskill){//Add new entry saving
           this.localService.insert(this.skill)
          .subscribe(
            /* happy path */ p => this.skillGrid = p,
            /* error path */ e => console.log(e),
            /* onComplete */ () => this.msgs.push({severity:'info', summary:'Success', detail:'Form Update Successfully'}));
        }
        else{ // update entry saving
          console.log('MILESTONE: ' + JSON.stringify( this.skill) + ' , f:' +  JSON.stringify( this.fileuploadarr));
          this.localService
          .update(this.skill)
          .subscribe(
            /* happy path */ p => this.skillGrid = p,
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
            'skill_name':new FormControl('', Validators. required),
            'skill_alias':new FormControl('', Validators. required),
            'maincat_id':new FormControl('', Validators. required),
            'subcat_id':new FormControl('', Validators. required),
          
        
      });
        //preload data Grid required 
        this.localService
      .getall()
      .subscribe(
         /* happy path */ p => this.skillGrid=p,
         /* error path */ e => console.log( e),
         /* onComplete */ () => this.processdata());

         
        
  }
  processdata(){
    

  }


  populateSubcategory(events1: any){
    //alert(events1.value);
    this.ngModelMaincatId=events1.value;
 
      this.localService.getSubcategory(this.ngModelMaincatId).subscribe(p =>{this.drpSubcatId=p;this.drpSubcatId.unshift({label:"Select" , value:"1"} )},e => console.log(e),() => console.log(this.drpSubcatId)); 
   /* this.localService.getSubcategory(this.ngModelMaincatId).subscribe(p =>this.drpSubcatId=p,e => console.log(e),() => console.log(this.drpSubcatId));*/
  }
  
 
 }
