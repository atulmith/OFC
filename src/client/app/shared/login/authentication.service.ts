import { Injectable } from '@angular/core';
import { Http, Headers, Response ,RequestOptions} from '@angular/http';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map'
import { Subject }    from 'rxjs/Subject';
import {Member} from '../../login/member';
import {BaseUrlService} from '../baseurl/baseurl.service';

import { UserRights } from '../../userrights/userrights';
@Injectable()
export class AuthenticationService {

    // Observable string sources
  private missionAnnouncedSource = new Subject<boolean>();
  baseUrl:string;

   missionAnnounced$=this.missionAnnouncedSource.asObservable();

    constructor(private http: Http,private baseurlservice:BaseUrlService) { 
        this.baseUrl=baseurlservice.getBaseurl()+"login/";

    }

    announceMission(mission:boolean){
        this.missionAnnouncedSource.next(mission );    
    }

    // login(username: string, password: string) {

        

    //     let sendarr:any[]=[];
    //     type MyType={name:string,password:string};
    //     let o2:MyType={"name":username,"password":password};
    //     //sendarr.push(o2);
    //     alert(JSON.stringify(o2));
    //     localStorage.setItem('currentUser', JSON.stringify(o2));

    //     return true;
    //     // return this.http.post('/api/authenticate', JSON.stringify({ username: username, password: password }))
    //     //     .map((response: Response) => {
    //     //         // login successful if there's a jwt token in the response
    //     //         let user = response.json();
    //     //         if (user && user.token) {
    //     //             // store user details and jwt token in local storage to keep user logged in between page refreshes
    //     //             localStorage.setItem('currentUser', JSON.stringify(user));
    //     //         }
    //     //     });
    // }

    callLoginWS(username: string,password:string): Observable<Member[]>{
        //Header declaration
        let headers1 = new Headers();
        headers1.append('Content-Type', 'application/x-www-form-urlencoded');
        //Body params
        var body1 = `username=${username}&password=${password}`;
        // URL declaration
        var url2 = `${this.baseUrl}WS_proc_member_login`;
        
        // var url3 = 'http://localhost:3001/callmysqlproc';

         let complaints1$ = this.http
        .post(url2 , body1 ,{headers: headers1}) // Post URL and header
        .map((res:Response) => res.json()) // Mapping response to return variable
        .catch(this.handleError); // Error handler
        

        /*let complaints1$ = this.http
        .post(url2 , body1 ,{headers: headers1}) // Post URL and header
        .map((res:Response) => res.json()) // Mapping response to return variable
        .catch(this.handleError); // Error handler*/
        //alert("getDisplayAll2 after");
        return complaints1$; 
    }


    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
    }

    isloggedin():boolean{
        if(localStorage.getItem('currentUser')){
            return true;
        }
        else{
            return false;
        }
    }

    getUserDetails():string{
        if(localStorage.getItem('currentUser')){
            let obj:Member=JSON.parse(localStorage.getItem('currentUser'));
            // alert("Detials;"+localStorage.getItem('currentUser'));
            return obj.member_name;
        }
        return "empty";
    }

    getUserType():string{
        if(localStorage.getItem('currentUser')){
            let obj:Member=JSON.parse(localStorage.getItem('currentUser'));
            // alert("Detials;"+localStorage.getItem('currentUser'));
            return obj.member_type;
        }
        return "client";
    }


    //as done on 10 feb 2017 by Mandar for getting userrights 
  getall(memberid:string): Observable<UserRights[]>{
    
    let headers1 = new Headers();
    headers1.append('Content-Type', 'application/x-www-form-urlencoded');
    
    var body1 = `memberid=${memberid}`;
    
    var url2 = `${this.baseUrl}WS_proc_tbl_member_rights_details_selectjson`;//selectAllMilestone`;
    
    let complaints1$ = this.http
      .post(url2 , body1 ,{headers: headers1})
      .map((res:Response) => res.json())
      .catch(this.handleError);
      //alert("getDisplayAll2 after");
      return complaints1$; 
  }
    
   private getHeaders(){
    let headers = new Headers();
    headers.append('Accept', 'application/json');
    return headers;
  }
  private getHeaders2(){
    let headers = new Headers({ 'Content-Type': 'application/json; charset=utf-8' });  
    let options = new RequestOptions({ headers: headers });
    return options;
  }
  private getHeadersUrlencode(){
    let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });  
    let options = new RequestOptions({ headers: headers });
    return options;
  }
  private getHeadersUrlencodeUtf8(){
    let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8' });  
    let options = new RequestOptions({ headers: headers });
    return options;
  }

  /**
    * Handle HTTP error
    */
  private handleError (error: any) {
    // In a real world app, we might use a remote logging infrastructure
    // We'd also dig deeper into the error to get a better message
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); // log to console instead
    return Observable.throw(errMsg);
  }
}