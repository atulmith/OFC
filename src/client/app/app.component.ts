import { Component,AfterViewInit,ElementRef,OnInit } from '@angular/core';
import { Config } from './shared/index';
import './operators';
import { Router } from '@angular/router';
import {AuthenticationService}  from './shared/login/authentication.service';
import {LoginComponent} from './login/login.component';

//as done on 8 feb 2017 by Mandar for menu validation
import {UserRights} from './shared/login/userrights';

declare var Ultima: any;


/**
 * This class represents the main application component.
 */
@Component({
  moduleId: module.id,
  selector: 'sd-app',
  templateUrl: 'app.component.html',
  providers:[AuthenticationService]

})
export class AppComponent implements AfterViewInit{
 layoutCompact: boolean = true;

    layoutMode: string = 'static';//static';
    
    darkMenu: boolean = false;
    
    profileMode: string = 'inline';

    loggedIn: boolean=false;
    
    userName:string='';
     
    usertype:string="client";


    constructor(private el: ElementRef,private router: Router,private authservice:AuthenticationService) {
        this.loggedIn=false;
        authservice.missionAnnounced$.subscribe(mission=>{
               this.loggedIn=mission;
                if(mission==true){
                    this.userName=this.authservice.getUserDetails();
                    this.usertype=this.authservice.getUserType();    
                    //alert("Done IT"+this.userName);
                    
                    //
                
                }         
        })
    }

    //as done 8 feb 2017 by Mandar
    //to get userrights
    userrightsScreen(screenname:any):boolean
    {
        
        //as done on 8 feb 2017 by Mandar
            //to retrieve userrights from localStorage
            let userrightStorage = localStorage.getItem('userrights');
            let rights :string[]=[];
            rights= JSON.parse(userrightStorage);

            for(let i=0;i<rights.length;i++)
            {
                let userrights: any = rights[i];
                let obj:UserRights = userrights;

                
                if(obj.screenname==screenname)
                {
                    //as done on 10 feb 2017 by Mandar for screen authentication

                    // if(obj.authentication=="yes"){
                    //     return true;
                    // }
                    
                    
                    if(obj.authentication=="true"){
                        
                        return true;
                    }
                    // else{
                    //     this.router.navigate(['/login', { returnUrl: state.url }]);
                    //     return false;
                    // }
                }

            }

            return false;
    }

    OnInit(){
        this.loggedIn= this.authservice.isloggedin();//true;
        this.userName=this.authservice.getUserDetails();
        // if (localStorage.getItem('currentUser')) {
        //     // logged in so return true
        //     this.loggedIn= true;
        //     alert("loggedin");
        //     this.router.navigate(['/']);
        // }else{
        //     this.loggedIn=false;
        //     this.router.navigate(['/login']);
        //     alert("not loggedin");
        // }
    }
    ngAfterViewInit() {
        Ultima.init(this.el.nativeElement);

        this.loggedIn= this.authservice.isloggedin();//true;
        this.userName=this.authservice.getUserDetails(); 
        //this.router.navigate(['/taskdashboard']);
    }

    reloadAppT(){
        alert("HI from reloadAppT");
     this.loggedIn=true;
        
    }

    logout(){
        //alert("LogOut");
        this.authservice.logout();
        this.loggedIn=false;
        this.userName='empty';
        this.router.navigate(['/login']);
        

    }
    // changeTheme(event, theme) {
    //     let themeLink: HTMLLinkElement = <HTMLLinkElement> document.getElementById('theme-css');
    //     let layoutLink: HTMLLinkElement = <HTMLLinkElement> document.getElementById('layout-css');
        
    //     themeLink.href = 'resources/theme/theme-' + theme +'.css';
    //     layoutLink.href = 'resources/layout/css/layout-' + theme +'.css';
    //     event.preventDefault();
    // }
}
