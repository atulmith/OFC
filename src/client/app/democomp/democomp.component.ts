import { Component,OnInit } from '@angular/core';
import {FormGroup,FormControl,Validators,FormBuilder} from '@angular/forms';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import {MessagesModule,Message,Growl} from 'primeng/primeng';
import {PanelModule} from 'primeng/primeng';
import { ActivatedRoute, Router } from '@angular/router';
import {ButtonModule} from 'primeng/primeng';
import {TestOne} from './testone';
import {FileUpload} from './fileupload';
import {DataTableModule} from 'primeng/primeng';

import { TestoneListService } from '../shared/testone/index';
import {FileUploadModule} from 'primeng/primeng';
import {CalendarModule} from 'primeng/primeng';

/**
 * This class represents the lazy loaded democompComponent.
 */
@Component({
  moduleId: module.id,
  selector: 'sd-democomp',
  templateUrl: 'democomp.component.html',
  styleUrls: ['democomp.component.css']
})
export class DemocompComponent implements OnInit {
  userform: FormGroup;
  msgs: Message[]=[];
  testones: TestOne[]=[];
   submitted: boolean;
   testone: TestOne;
   selectedRow: TestOne;


   newtestone: boolean;
   date2:Date;      
   stringdate2:string;

      //fileupload
      uploadedFiles: any[] = [];
      fileuploadarr: FileUpload[]=[];
      fileupload: FileUpload;
      clear(){
            this.newtestone=true;
            this.testone={
        
    
            status: 'string',
            testone_pk: 1,
            testone_city: '',
            testone_name: '',
            testone_state: '',
            testone_address: 'string',
            testone_country: 'string',   
    
        }
        this.fileupload={
          fileName: '',
          fileType: '',
          filePath: '',
          fileStatus: '',
          uploadfile_filename: ''
        }
      }

  constructor(private fb: FormBuilder,
              private route: ActivatedRoute,
              private router: Router,
              private localService: TestoneListService){


  }
  onRowSelect(event: any){
         this.newtestone=false;
         this.testone=this.selectedRow;
  }
  onFinalFileUpload(){
    
   // let sendarr:any[]=[];
   // type MyType={name:string};
    alert(this.uploadedFiles.length);
    for(let i=0;i<this.uploadedFiles.length;i++){
          let filename=this.uploadedFiles[i].name;
         // alert("insidefileupload: " + filename);
         // let o2:MyType={"name":filename};
          
          this.fileupload.fileName=filename;
          this.fileupload.filePath='';
          this.fileupload.fileStatus='Yes';
          this.fileupload.fileType='img';
          this.fileupload.uploadfile_filename='';
         // alert("insidefileupload: " + JSON.stringify(this.fileupload));
          this.fileuploadarr.push(this.fileupload);
          //o2.name=filename;
         // sendarr.push(o2);

          //this.clear();
           //alert(filename); 
        }
       // alert(JSON.stringify(this.fileuploadarr));
   // console.log("uploading this:"+JSON.stringify(sendarr));    
    this.localService.submitUploadAndOthers(this.fileuploadarr)
      .subscribe(
         /* happy path */ p => console.log( p),
         /* error path */ e => console.log(e),
         /* onComplete */ () => this.msgs.push({severity:'info', summary:'Success', detail:'Form Update Successfully'}));
    //console.log("Result of file upload=myres.issuccess");
    // submitUploadAndOthers
  } 
  onSubmit(){
      //   alert(JSON.stringify(this.selectedRow));
        this.submitted = true;
        this.msgs = [];
        console.log(JSON.stringify(this.testone));
        this.msgs.push({severity:'info', summary:'Please wait', detail:'Form Submitted Successfully.. Please wait..'})
        if(this.newtestone){
        this.localService
      .getUpdateAll(this.testone)
      .subscribe(
         /* happy path */ p => this.testones = p,
         /* error path */ e => console.log(e),
         /* onComplete */ () => this.msgs.push({severity:'info', summary:'Success', detail:'Form Update Successfully'}));
        }else{
      this.localService
      .getUpdateAll2(this.testone)
      .subscribe(
         /* happy path */ p => this.testones = p,
         /* error path */ e => console.log(e),
         /* onComplete */ () => this.msgs.push({severity:'info', summary:'Success', detail:'Form Update Successfully'}));
        }
        this.submitted = true;
        this.msgs = [];
        this.msgs.push({severity:'info', summary:'Success', detail:'Form Update Successfully'});
  }
  onUpload(event: any){
    //alert(event.files);
    alert("evenfiles outseide");
    for(let file of event.files) {
            alert("evenfiles");
            this.uploadedFiles.push(file);
        }
    
        //console.log(event.xhr.response);
        this.msgs = [];
        this.msgs.push({severity: 'info', summary: 'File Uploaded', detail: ''});
  }
onBeforeUpload(event :any ){
  event.xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded;multipart/form-data;');
  console.log("mith here:");
}

  ngOnInit() { 

      //this.date2=new Date('27/02/81');
      let a=Date.parse('1981/03/27');
      this.date2=new Date(322963200000);//a);
      this.stringdate2="322963200000"
       //alert(this.date2);
      // this.date2.setDate(27);
      // this.date2.setMonth(2);
      // this.date2.setFullYear(1980);

      this.fileupload={
          fileName: '',
          fileType: '',
          filePath: '',
          fileStatus: '',
          uploadfile_filename: ''
        }
      this.userform = this.fb.group({
            'name': new FormControl('', Validators.required),
             'city': new FormControl('', Validators.required),
             'state': new FormControl('', Validators.required)
            
        });
        this.localService
      .getDisplayAll2()
      .subscribe(
         /* happy path */ p => this.testones = p,
         /* error path */ e => console.log( e),
         /* onComplete */ () => console.log('done getDisplayAll2' + JSON.stringify(this.testones)));

         this.testone={
        
    
            status: 'string',
            testone_pk: 1,
            testone_city: '',
            testone_name: '',
            testone_state: '',
            testone_address: 'string',
            testone_country: 'string',   
    
        }
  }
  get diagnostic() { return JSON.stringify(this.userform.value); }
 }
