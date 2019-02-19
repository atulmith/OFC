import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MessagesModule, Message, Growl } from 'primeng/primeng';
import { PanelModule } from 'primeng/primeng';
import { ActivatedRoute, Router } from '@angular/router';
import { ButtonModule } from 'primeng/primeng';
import { Subcategory } from './subcategory';
import {KeywordSubcat} from './keywordSubcat';
import { Dropdown1 } from './dropdown1';
import { FileUpload } from './fileupload';
import { DataTableModule } from 'primeng/primeng';
import { DropdownModule } from 'primeng/primeng';
import { InputTextareaModule } from 'primeng/primeng';

import { MyCurrencyPipe } from '../shared/pipes/first.pipe';
import { SubcategoryService } from '../shared/subcategory/index';

import { FileUploadModule } from 'primeng/primeng';
import { SelectItem } from 'primeng/primeng';
import { MyDateFormat } from '../shared/pipes/mydateformat.pipe';
import { EmailValidate } from '../shared/pipes/emailvalidate.pipe';
import { CustomValidator } from '../shared/validators/validator.directive';
/**
 * This class represents the lazy loaded subcategoryComponent.
 */
@Component({
  moduleId: module.id,
  selector: 'sd-subcategory',
  templateUrl: 'subcategory.component.html',
  styleUrls: ['subcategory.component.css'],
  providers: [MyCurrencyPipe, MyDateFormat, EmailValidate, SubcategoryService]
})
export class SubcategoryComponent implements OnInit {
  //Form grop 
  userform: FormGroup;
  keywordForm: FormGroup;
  // Growl messege
  msgs: Message[] = [];

  //Declare: Data handling for Grid flow, form flow
  subcategoryGrid: Subcategory[] = [];
  
  submitted: boolean;
  subcategory: Subcategory;
  selectedSubcategoryRow: Subcategory;

  displayDialog: boolean;

  keywordSubcat:KeywordSubcat;
  cont:KeywordSubcat;
  keywordGrid: KeywordSubcat[] = [];

  drpMainCatId: SelectItem[]=[];

  selectedkeywordgridRow: KeywordSubcat;

  checked: boolean = false;
   
  //boolean value for Add new or Edit Mode
  newsubcategory: boolean;
  newKeywordSubcat: boolean;
  //  selectedsubcategory: string;

  //*** fileupload Declare ***
  //Client format for file upload
  uploadedFiles: any[] = [];
  //server format for file upload
  fileuploadarr: FileUpload[] = [];
  fileupload: FileUpload;

  //Prepare data for new entry or initize data during form load by clearing data or presetting data
  clear() {
    this.newsubcategory = true;
    this.subcategory = {

      subcat_id: '',
      subcat_name: '',
      subcat_aliasname: '',
      maincat_id: '',
      createdate: '',
      modifieddate: '',
      status: ''


    };

this.keywordSubcat={
      keysubcat_name:'',
      keysubcat_searchtext:'',
      subcat_id:'',
      subcat_name:'',
      subcat_aliasname:'',
      maincat_id:'',
      createdate:'',
      modifieddate:'',
      status:'',
      keysubcat_id:''
     };
      

    this.fileupload = {
      fileName: '',
      fileType: '',
      filePath: '',
      fileStatus: '',
      uploadfile_filename: ''
    }
  }

clearKeywordSubcat(){
       
      this.keywordSubcat={
      keysubcat_name:'',
      keysubcat_searchtext:'',
      subcat_id:'',
      subcat_name:'',
      subcat_aliasname:'',
      maincat_id:'',
      createdate:'',
      modifieddate:'',
      status:'',
      keysubcat_id:''
     };
      
      
    
  }



  // constructor initiaze of all necessary variable and objects
  constructor(private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private localService: SubcategoryService,
    private mycur: MyCurrencyPipe,
    private mydate1: MyDateFormat,
    private emailval: EmailValidate
  ) {

    //this.populatedrp();
 /*this.localService.getMainCatId('hj').subscribe(p =>this.drpMainCatId=p,e => console.log(e),() => console.log(this.drpMainCatId));*/
 this.localService.getMainCatId('hj').subscribe(p =>{this.drpMainCatId=p;this.drpMainCatId.unshift({label:"Select" , value:"1"} )},e => console.log(e),() => console.log(this.drpMainCatId));
      

  }
  onSubcategoryRowSelected(event: any) {
    //Indicator for form is in Edit mode
    this.newsubcategory = false;
    //Copy of row selected
    this.subcategory = this.selectedSubcategoryRow;

    


    this.localService
      .getedit(this.subcategory.subcat_id)
      .subscribe(
         /* happy path */ p => this.subcategory = p,
         /* error path */ e => console.log(e),
         /* onComplete */() => this.aftercalldate());//console.log('done getselectEditMember: ' + this.subcategory));

 

  }

  aftercalldate() {

this.localService
      .getSubCatKeyword(this.subcategory.subcat_id)
      .subscribe(
         /* happy path */ p => this.keywordGrid = p,
         /* error path */ e => console.log(e),
         /* onComplete */() => console.log('KeywordGrid: ' + this.keywordGrid));

  }

  //Prepare for JSON for file to be uploaded to server just after form submission
  onFinalFileUpload() {

    // alert(this.uploadedFiles.length);
    for (let i = 0; i < this.uploadedFiles.length; i++) {
      let filename = this.uploadedFiles[i].name;


      this.fileupload.fileName = filename;
      this.fileupload.filePath = '';
      this.fileupload.fileStatus = 'Yes';
      this.fileupload.fileType = 'img';
      this.fileupload.uploadfile_filename = '';
      // alert("insidefileupload: " + JSON.stringify(this.fileupload));
      this.fileuploadarr.push(this.fileupload);

    }

  }




  onSubmit() {

    this.onFinalFileUpload();
    this.submitted = true;
    this.msgs = [];
    console.log(JSON.stringify(this.subcategory));
    console.log(JSON.stringify(this.keywordGrid));
    this.msgs.push({ severity: 'info', summary: 'Please wait', detail: 'Form Submitted Successfully.. Please wait..' })

    if (this.newsubcategory) {//Add new entry saving
      this.localService.insert(this.subcategory,this.keywordGrid)
        .subscribe(
            /* happy path */ p => this.subcategoryGrid = p,
            /* error path */ e => console.log(e),
            /* onComplete */() => this.msgs.push({ severity: 'info', summary: 'Success', detail: 'Form Update Successfully' }));
    }
    else { // update entry saving
      console.log('MILESTONE: ' + JSON.stringify(this.subcategory) + ' , f:' + JSON.stringify(this.fileuploadarr));
      this.localService
        .update(this.subcategory,this.keywordGrid)
        .subscribe(
            /* happy path */ p => this.subcategoryGrid = p,
            /* error path */ e => console.log(e),
            /* onComplete */() => this.msgs.push({ severity: 'info', summary: 'Success', detail: 'Form Update Successfully' }));
    }

    this.clear();
    this.clearKeywordSubcat();
    this.keywordGrid=[];
  }



 onSubmitkeyword(){
      
   // alert(JSON.stringify(this.keywordSubcat));
    this.keywordGrid.push(this.keywordSubcat);
 //   alert(JSON.stringify(this.keywordSubcats));
    this.clearKeywordSubcat();    
         
  }


  //upload files to the server
  onUpload(event: any) {
    //alert(event.files);
    for (let file of event.files) {

      this.uploadedFiles.push(file);
    }

    //console.log(event.xhr.response);
    this.msgs = [];
    this.msgs.push({ severity: 'info', summary: 'File Uploaded', detail: '' });
  }

  //File upload event
  onBeforeUpload(event: any) {
    event.xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded;multipart/form-data;');
    console.log("mith here:");
  }

  //Form init
  ngOnInit() {
    //Clear event and initalize objects
    this.clear();



    this.userform = this.fb.group({
      'subcat_name': new FormControl('', Validators.required),
      'subcat_aliasname': new FormControl('', Validators.required),
      'maincat_id': new FormControl('', Validators.required),

        'keyword_subgroup': this.fb.group({ 
        'keysubcat_name2': new FormControl('', Validators.required), 
        'keysubcat_searchtext': new FormControl('', Validators.required), 
        
      })
       
    });


    //preload data Grid required 
    this.localService.getall().subscribe(
         /* happy path */ p => this.subcategoryGrid = p,
         /* error path */ e => console.log(e),
         /* onComplete */() => {
           console.log("this.subcategoryGrid : "+JSON.stringify(this.subcategoryGrid));
         });




  }


  onKeywordSubcatRowSelected(event: any)
  {
       this.newKeywordSubcat = false;
        this.keywordSubcat = this.cloneKeywordSubcat(event.data);
        this.localService.getall()
          .subscribe(p => this.subcategoryGrid = p, e => console.log(e), () => this.mymethod()); 
        
        this.displayDialog = true;
          
  }


   cloneKeywordSubcat(c: any):KeywordSubcat {
        let keywordSubcat:any = this.keywordSubcat;
        for(let prop in c) {
            keywordSubcat[prop] = c[prop];
        }
        return keywordSubcat;
    }
    

  mymethod(){} 

   save() 
   {

        if(this.newKeywordSubcat)
            this.keywordGrid.push(this.keywordSubcat);
        else
            this.keywordGrid[this.findSelectedKeywordSubcatIndex()] = this.keywordSubcat;
          //keywordSubcat.keysubcat_id
        
        this. clearKeywordSubcat();
        this.displayDialog = false;
      
    }
    
    delete() 
    {
        
        this.keywordGrid.splice(this.findSelectedKeywordSubcatIndex(), 1);
         this.clearKeywordSubcat();
        this.displayDialog = false;
    }  

 cancelDelete() 
    {
        
     
        this.displayDialog = false;
    }  

deleteKeywordRow(cont: KeywordSubcat) 
{
      
        this.selectedkeywordgridRow=cont;
        this.keywordGrid.splice(this.findSelectedKeywordSubcatIndex(), 1);
        this.cont = null;
        this.selectedkeywordgridRow=null;
        
        this.clearKeywordSubcat();
  }
     findSelectedKeywordSubcatIndex(): number {
        return this.keywordGrid.indexOf(this.selectedkeywordgridRow);
    }  
  processdata() {


  }



}
