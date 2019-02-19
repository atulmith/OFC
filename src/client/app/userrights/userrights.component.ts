import { Component,OnInit } from '@angular/core';
import {FormGroup,FormControl,Validators,FormBuilder} from '@angular/forms';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import {MessagesModule,Message,Growl} from 'primeng/primeng';
import {PanelModule} from 'primeng/primeng';
import { ActivatedRoute, Router } from '@angular/router';
import {ButtonModule} from 'primeng/primeng';
import {Userrights} from './userrightslocal';
import {UserRights} from './userrights';

import {DataTableModule} from 'primeng/primeng';
import {DropdownModule} from 'primeng/primeng';


import { MyCurrencyPipe } from '../shared/pipes/first.pipe';
import { UserrightsService } from '../shared/userrights/index';

import {FileUploadModule} from 'primeng/primeng';
import {SelectItem} from 'primeng/primeng';
import { MyDateFormat } from '../shared/pipes/mydateformat.pipe';
import { EmailValidate } from '../shared/pipes/emailvalidate.pipe';
import { CustomValidator } from '../shared/validators/validator.directive';
import {BaseUrlService} from '../shared/baseurl/baseurl.service';
/**
 * This class represents the lazy loaded userrightsComponent.
 */
@Component({
  moduleId: module.id,
  selector: 'sd-userrights',
  templateUrl: 'userrights.component.html',
  styleUrls: ['userrights.component.css'],
  providers:[MyCurrencyPipe,MyDateFormat,EmailValidate,BaseUrlService]
})
export class UserrightsComponent implements OnInit {
  //Form grop 
  userform: FormGroup;
  // Growl messege
  msgs: Message[]=[];

  //Declare: Data handling for Grid flow, form flow
  userrightss: UserRights[]=[];
  submitted: boolean;
  userrights: Userrights;
  selectedRow: Userrights;

  

   //boolean value for Add new or Edit Mode
   newuserrights: boolean;
   
  //  selecteduserrights: string;
       


  mybaseurl:string;

  //as done on 9 feb 2017 by Mandar
  userrightsForm:Userrights[]=[];
  drpMemberId: SelectItem[]=[];
  memberId : string ='';

  //Prepare data for new entry or initize data during form load by clearing data or presetting data
  clear(){
        this.newuserrights=true;
        this.userrights={
            
         
          screenname :'',
          authentication :false,
          member_id : '',
          memauth_id:0
         
      }

     
  }

  // constructor initiaze of all necessary variable and objects
  constructor(private fb: FormBuilder,
              private route: ActivatedRoute,
              private router: Router,
              private localService: UserrightsService,
              private mycur: MyCurrencyPipe,
              private mydate1: MyDateFormat,
              private emailval: EmailValidate,
              private baseUrlservice:BaseUrlService
              ){
           this.mybaseurl=baseUrlservice.getBaseurl();     
        
 
            this.localService.getMembers('hj').subscribe(p =>{this.drpMemberId=p;this.drpMemberId.unshift({label:"Select" , value:"0"} )},e => console.log(e),() => console.log(this.drpMemberId));
  }
  
  
  getMember(events:any)
  {
        //intialise to all rights to false
        this.userrightsForm = this.getUIUserrights();
        console.log('events.value : '+events.value);
        
        if(events.value=='0')
        {
          this.memberId='';
          console.log('this.memberId if : '+this.memberId);
        }
        else{
          
        
          //preload data Grid required
          console.log('event : '+this.memberId);
          this.localService
        .getall(this.memberId)
        .subscribe(
          /* happy path */ p => this.userrightss=p,
          /* error path */ e => console.log(e),
          /* onComplete */ () => {
            this.userrightsForm=[];
            //convert string to boolean
            for(let i=0;i<this.userrightss.length;i++)
            {
              
                let authenticationStr =  this.userrightss[i].authentication;
                let authenticationbool = JSON.parse(authenticationStr);
                let local:Userrights=
                {
                  authentication:authenticationbool,
                  member_id:this.userrightss[i].member_id,
                  screenname:this.userrightss[i].screenname,
                  memauth_id:this.userrightss[i].memauth_id,
                }
                this.userrightsForm.push(local);

            }

            //this.userrightsForm = this.userrightss;
            console.log('userrightsForm : '+JSON.stringify(this.userrightsForm));
          });
        }
  }

  onSubmit(){
      
        this.submitted = true;
        this.msgs = [];
        console.log('userRightString boolean : '+JSON.stringify(this.userrightsForm));
        
          //as done on 10 feb 2017 by Mithun Sir to change boolean to string;
          let userRightString:UserRights[] = this.convertrights(this.userrightsForm);

           this.localService
          .insert(userRightString,this.memberId)
          .subscribe(
            /* happy path */ p => this.userrightss = p,
            /* error path */ e => console.log(e),
            /* onComplete */ () => this.msgs.push({severity:'info', summary:'Success', detail:'Form Update Successfully'}));

        
          this.submitted = true;
          this.msgs = [];
          this.msgs.push({severity:'info', summary:'Success', detail:'Form Update Successfully'});
  }

 

//Form init
ngOnInit() { 
      //Clear event and initalize objects
      this.clear();

      //to get Userrightsform to show ui
      
      this.userrightsForm = this.getUIUserrights();
                      
                      

  }
  processdata(){
    

  }

  //to get ui data for userrightsForm
  getUIUserrights():Userrights[]
  {
    // as done on 9 feb 2017 by Mandar to add userrights for each screen
                      let userrightsForm1 =  [{"screenname":"userrights","authentication":false,member_id:'',memauth_id:0},{"screenname":"home","authentication":false,member_id:'',memauth_id:0}
                      ,{"screenname":"country","authentication":false,member_id:'',memauth_id:0},{"screenname":"city","authentication":false,member_id:'',memauth_id:0},
                        {"screenname":"certification","authentication":false,member_id:'',memauth_id:0},{"screenname":"company","authentication":false,member_id:'',memauth_id:0},
                        {"screenname":"currency","authentication":false,member_id:'',memauth_id:0},{"screenname":"currencyconversion","authentication":false,member_id:'',memauth_id:0},
                        {"screenname":"education","authentication":false,member_id:'',memauth_id:0},{"screenname":"language","authentication":false,member_id:'',memauth_id:0},
                        {"screenname":"maincategory","authentication":false,member_id:'',memauth_id:0},{"screenname":"member","authentication":false,member_id:'',memauth_id:0},
                        {"screenname":"membershiptype","authentication":false,member_id:'',memauth_id:0},{"screenname":"plan","authentication":false,member_id:'',memauth_id:0},
                        {"screenname":"popularsearch","authentication":false,member_id:'',memauth_id:0},{"screenname":"popularservices","authentication":false,member_id:'',memauth_id:0},
                        {"screenname":"pricerange","authentication":false,member_id:'',memauth_id:0},{"screenname":"privacypolicy","authentication":false,member_id:'',memauth_id:0},
                        {"screenname":"securityquestion","authentication":false,member_id:'',memauth_id:0},{"screenname":"skill","authentication":false,member_id:'',memauth_id:0},
                        {"screenname":"state","authentication":false,member_id:'',memauth_id:0},{"screenname":"subcategory","authentication":false,member_id:'',memauth_id:0},
                        {"screenname":"termscondition","authentication":false,member_id:'',memauth_id:0},{"screenname":"testimonial","authentication":false,member_id:'',memauth_id:0}
          
                      ];

                      return userrightsForm1;

  }
  
  //as done on 10 feb 2017 by Mithun sir to convert boolean to string
  convertrights(a:Userrights[]):UserRights[]{
    let b:UserRights[]=[];

    for(let i=0;i<a.length;i++){
      let local:UserRights={
        authentication:a[i].authentication+"",
        member_id:a[i].member_id,
        screenname:a[i].screenname,
        memauth_id:a[i].memauth_id
      }
      b.push(local);
    }
    console.log("After convert="+JSON.stringify(b));
    return b;
  }

  //String.prototype.replaceAll = function(s,r){return this.split(s).join(r)}

  //Just a method to call user form data on form submit
  get diagnostic() { return JSON.stringify(this.userform.value); }

 }
