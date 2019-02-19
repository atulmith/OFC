import { Component } from '@angular/core';

import {DataTableModule} from 'primeng/primeng';
import {DialogModule} from 'primeng/primeng';
import {ButtonModule} from 'primeng/primeng';
import {InputTextModule} from 'primeng/primeng';
import {CalendarModule} from 'primeng/primeng';

import { Router} from '@angular/router';
import { AuthenticationService } from '../shared/login/index';
import {UserRights} from '../shared/login/userrights';
import {AppComponent} from '../app.component';
import {Member} from './member';

/**
 * This class represents the lazy loaded AboutComponent.
 */
@Component({
  moduleId: module.id,
  selector: 'sd-login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.css'],
  providers:[AppComponent]

})
export class LoginComponent {

  boollogin: boolean;
  username:string;
  password:string;

  member:Member;


  //as done on 10 feb 2017 by Mandar for userrights form validation
  userrightss: UserRights[]=[];

  constructor(private router: Router,private localService: AuthenticationService,private appComponent:AppComponent)
   {
     
   }
  adminlogin()
  {
    // alert(this.username);
    //this.router.navigate(['home']);
    this.localService.callLoginWS(this.username,this.password)
      .subscribe(p  => {this.member = p[0];
                        
                      },
                e=>console.log("Login Error ",e),
                ()=>{
                    //alert(JSON.stringify(this.member));
                   if(this.member!=null){
                     if(this.member.username==this.username){
                      localStorage.setItem('currentUser', JSON.stringify(this.member));
                      this.boollogin=true;
                      this.localService.announceMission(true);

                      // as done on 8 feb 2017 by Mandar to add userrights for each screen
                      // let screenvalidation:UserRights[] =  [{"screenname":"userrights","authentication":"yes"},{"screenname":"home","authentication":"yes"},{"screenname":"country","authentication":"yes"},{"screenname":"city","authentication":"no"},
                      //   {"screenname":"certification","authentication":"yes"},{"screenname":"company","authentication":"no"},
                      //   {"screenname":"currency","authentication":"yes"},{"screenname":"currencyconversion","authentication":"no"},
                      //   {"screenname":"education","authentication":"yes"},{"screenname":"language","authentication":"no"},
                      //   {"screenname":"maincategory","authentication":"yes"},{"screenname":"member","authentication":"no"},
                      //   {"screenname":"membershiptype","authentication":"yes"},{"screenname":"plan","authentication":"no"},
                      //   {"screenname":"popularsearch","authentication":"yes"},{"screenname":"popularservices","authentication":"no"},
                      //   {"screenname":"pricerange","authentication":"yes"},{"screenname":"privacypolicy","authentication":"no"},
                      //   {"screenname":"securityquestion","authentication":"yes"},{"screenname":"skill","authentication":"yes"},
                      //   {"screenname":"state","authentication":"yes"},{"screenname":"subcategory","authentication":"no"},
                      //   {"screenname":"termscondition","authentication":"yes"},{"screenname":"testimonial","authentication":"no"}
          
                      // ]


                      console.log('this.member.member_id : '+this.member.member_id);
                      //as done on 10 feb 2017 by Mandar to get userrights
                      this.localService.getall(this.member.member_id)
                      .subscribe(
                            /* happy path */ p => this.userrightss=p,
                            /* error path */ e => console.log(e),
                            /* onComplete */ () => {


                               console.log('this.userrightss : '+JSON.stringify(this.userrightss));
                              //screenvalidation.filter
                      // store in localStorage
                      localStorage.setItem('userrights', JSON.stringify(this.userrightss));

                      this.router.navigate(['/home']);

                      });
                      
                      
                     }
                     else{
                       this.boollogin=false;
                       this.router.navigate(['/login']);
                     }
                   }
                   else{
                     this.boollogin=false;
                     this.router.navigate(['/login']);
                   }
                });
    
    // if(this.localService.login(this.username,this.password)){
    //         this.boollogin=true;
    //         // this.router.navigate(['/']);
    //         // this.router.navigate(['/home']);
    //         //this.appComponent.reloadAppT();
    //         this.localService.announceMission(true);
    // }else{
    //   this.boollogin=false;
    //         this.router.navigate(['/login']);
    // }

           
      }

adminlogout(){
  this.localService.logout();
  this.router.navigate(['/login']);
}      



 }
