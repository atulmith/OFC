import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { UserRights } from '../../userrights/userrights';
import {SelectItem} from 'primeng/primeng';
import {BaseUrlService} from '../baseurl/baseurl.service';

// import 'rxjs/add/operator/do';  // for debugging

/**
 * This class provides the NameList service with methods to read names and add names.
 */
@Injectable()
export class UserrightsService {

  /**
   * Creates a new NameListService with the injected Http.
   * @param {Http} http - The injected Http.
   * @constructor
   */
  //private baseUrl: string = 'http://localhost:8080/TaskManagerWS/rest/atultest/';
  private baseUrl: string;
  
  constructor(private http : Http,private baseUrlservice:BaseUrlService){
    this.baseUrl=baseUrlservice.getBaseurl()+'login/';
  }
  /**
   * Returns an Observable for the HTTP GET request for the JSON resource.
   * @return {string[]} The Observable for the HTTP request.
   */
  get(): Observable<string[]> {
    return this.http.get('/assets/data.json')
                    .map((res: Response) => res.json())
    //              .do(data => console.log('server data:', data))  // debug
                    .catch(this.handleError);
  }


  insert(inparam: UserRights[],memberid : string): Observable<UserRights[]>{
    //Header declaration
    let headers1 = new Headers();
    headers1.append('Content-Type', 'application/x-www-form-urlencoded');
    //Body params
    var body1 = `inparam=${JSON.stringify( inparam)}&memberid=${memberid}`;
    // URL declaration
    var url2 = `${this.baseUrl}WS_proc_tbl_member_rights_details_create`;//insertMilestonesUserrights`;
    
    let complaints1$ = this.http
      .post(url2 , body1 ,{headers: headers1}) // Post URL and header
      .map((res:Response) => res.json()) // Mapping response to return variable
      .catch(this.handleError); // Error handler
      //alert("getDisplayAll2 after");
      return complaints1$; 
  }

  // Update old entry
  update(inparam: UserRights): Observable<UserRights[]>{
    
     //Header declaration
    let headers1 = new Headers();
    headers1.append('Content-Type', 'application/x-www-form-urlencoded');
    //Body params
    var body1 = `input=${JSON.stringify( inparam)}`;
    // URL declaration
    var url2 = `${this.baseUrl}WS_tbl_userrights_master_update`;//insertMilestonesUserrights`;
    
    //Call WS
    let complaints1$ = this.http
      .post(url2 , body1 ,{headers: headers1}) // Post URL and header
      .map((res:Response) => res.json()) // Mapping response to return variable
      .catch(this.handleError); // Error handler
      //alert("getDisplayAll2 after");
      return complaints1$; 
  }

  

  

  // On Edit get data
  getedit(pkid: string): Observable<UserRights>{
   
    let headers1 = new Headers();
    headers1.append('Content-Type', 'application/x-www-form-urlencoded');
   
    var body1 = `input=${ pkid}`;
   
    var url2 = `${this.baseUrl}WS_tbl_userrights_master_selectedit`;//selectEditMilestone`;
    
    let complaints1$ = this.http
      .post(url2 , body1 ,{headers: headers1})
      .map((res:Response) => res.json())
      .catch(this.handleError);
      //alert("getDisplayAll2 after");
      return complaints1$; 
  }

  // get all for Grid
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

  
 // 5.Get members for Dropdown
  getMembers(inparam: string): Observable<SelectItem[]>{
    
    let headers1 = new Headers();
    headers1.append('Content-Type', 'application/x-www-form-urlencoded');
    
    var body1 = `input0=${ inparam}`;
    
    var url2 = `${this.baseUrl}WS_proc_tbl_member_master_drpjson`;
    
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

