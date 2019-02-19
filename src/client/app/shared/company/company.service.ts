import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Company } from '../../company/company';
import { CompanyGrid } from '../../company/companygrid';
import { State } from '../../state/state';

import {SelectItem} from 'primeng/primeng';
import { Dropdown1 } from '../../company/dropdown1';
import {BaseUrlService} from '../baseurl/baseurl.service';
// import 'rxjs/add/operator/do';  // for debugging

/**
 * This class provides the NameList service with methods to read names and add names.
 */
@Injectable()
export class CompanyService {

  /**
   * Creates a new NameListService with the injected Http.
   * @param {Http} http - The injected Http.
   * @constructor
   */
  //private baseUrl: string = 'http://localhost:8080/TaskManagerWS/rest/atultest/';
  private baseUrl: string;// = 'http://192.168.0.55:8080/TaskManagerWS/rest/taskmanager/';
  
  constructor(private http : Http,private baseurlservice:BaseUrlService){
    this.baseUrl=baseurlservice.getBaseurl()+'company/';

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

  

  //1.to insert company
  insert(inparam: Company): Observable<CompanyGrid[]>{
    //Header declaration
    let headers1 = new Headers();
    headers1.append('Content-Type', 'application/x-www-form-urlencoded');
    //Body params
    var body1 = `input0=${JSON.stringify( inparam)}`;
    // URL declaration
    var url2 = `${this.baseUrl}WS_tbl_company_master_create`;//insertMilestonesProject`;
    
    let complaints1$ = this.http
      .post(url2 , body1 ,{headers: headers1}) // Post URL and header
      .map((res:Response) => res.json()) // Mapping response to return variable
      .catch(this.handleError); // Error handler
      //alert("getDisplayAll2 after");
      return complaints1$; 
  }

  // 2.Update company
  update(inparam: Company): Observable<CompanyGrid[]>{
    
     //Header declaration
    let headers1 = new Headers();
    headers1.append('Content-Type', 'application/x-www-form-urlencoded');
    //Body params
    var body1 = `input0=${JSON.stringify( inparam)}`;
    // URL declaration
    var url2 = `${this.baseUrl}WS_tbl_company_master_update`;//insertMilestonesProject`;
    
    //Call WS
    let complaints1$ = this.http
      .post(url2 , body1 ,{headers: headers1}) // Post URL and header
      .map((res:Response) => res.json()) // Mapping response to return variable
      .catch(this.handleError); // Error handler
      //alert("getDisplayAll2 after");
      return complaints1$; 
  }

  // 3.get all for Company
  getall(): Observable<CompanyGrid[]>{
    
    let headers1 = new Headers();
    headers1.append('Content-Type', 'application/x-www-form-urlencoded');
    
    var body1 = `input0=abc`;
    
    var url2 = `${this.baseUrl}WS_vw_company_city_state_country_details_selectjson`;//selectAllMilestone`;
    
    let complaints1$ = this.http
      .post(url2 , body1 ,{headers: headers1})
      .map((res:Response) => res.json())
      .catch(this.handleError);
      //alert("getDisplayAll2 after");
      return complaints1$;
  }

  

  // 4.On Edit get company
  getedit(pkid: string): Observable<Company>{
   
    let headers1 = new Headers();
    headers1.append('Content-Type', 'application/x-www-form-urlencoded');
   
    var body1 = `input0=${ pkid}`;
   
    var url2 = `${this.baseUrl}WS_tbl_company_master_selectedit`;//selectEditMilestone`;
    
    let complaints1$ = this.http
      .post(url2 , body1 ,{headers: headers1})
      .map((res:Response) => res.json())
      .catch(this.handleError);
      //alert("getDisplayAll2 after");
      return complaints1$; 
  }


  
// 5.Get country for Dropdown
  getCountry(inparam: string): Observable<SelectItem[]>{
    
    let headers1 = new Headers();
    headers1.append('Content-Type', 'application/x-www-form-urlencoded');
    
    var body1 = `input0=${ inparam}`;
    
    var url2 = `${this.baseUrl}WS_tbl_country_master_drpjson`;
    
    let complaints1$ = this.http
      .post(url2 , body1 ,{headers: headers1})
      .map((res:Response) => res.json())
      .catch(this.handleError);
      //alert("getDisplayAll2 after");
      return complaints1$; 
  }

  // 6.Get state for Dropdown
  getState(inparam: string): Observable<SelectItem[]>{
    
    let headers1 = new Headers();
    headers1.append('Content-Type', 'application/x-www-form-urlencoded');
    
    var body1 = `input0=${ inparam}`;
    
    var url2 = `${this.baseUrl}WS_tbl_state_master_country_id_drpjson`;
    
    let complaints1$ = this.http
      .post(url2 , body1 ,{headers: headers1})
      .map((res:Response) => res.json())
      .catch(this.handleError);
      //alert("getDisplayAll2 after");
      return complaints1$; 
  }

  // 7.Get city for Dropdown
  getCity(inparam: string): Observable<SelectItem[]>{
    
    let headers1 = new Headers();
    headers1.append('Content-Type', 'application/x-www-form-urlencoded');
    
    var body1 = `input0=${ inparam}`;
    
    var url2 = `${this.baseUrl}WS_tbl_city_master_state_id_drpjson`;
    
    let complaints1$ = this.http
      .post(url2 , body1 ,{headers: headers1})
      .map((res:Response) => res.json())
      .catch(this.handleError);
      //alert("getDisplayAll2 after");
      return complaints1$; 
  }

  // submitUploadAndOthers(uploadedFiles: any[]):Observable<any>{
  //   let headers1 = new Headers();
  //   headers1.append('Content-Type', 'application/x-www-form-urlencoded');
  //   var body1 = `fileuploadarray=${JSON.stringify( uploadedFiles)}`;
  //   alert("body" + JSON.stringify(uploadedFiles))
  //   var url2 = `http://localhost:8080/TaskManagerWS/rest/atultest/submitfileupload`;
    

  //   //type MyType={issuccess:string};

  //   let myresult=this.http
  //     .post(url2,body1  ,{headers: headers1})
  //     .map((res:Response) => res.json())
  //     .catch(this.handleError);
  //   // alert("hh"+myresult.issuccess);  
  //   console.log("Mith:",myresult);
  //   console.log("mith2:",uploadedFiles);
  //   return myresult;  
  // }

  

  // getDisplayAll2(): Observable<Milestone[]>{
  //   //alert("getDisplayAll2 before");
  //   // let complaints1$ = this.http
  //   //   .post(`http://localhost:8080/Atultest/rest/atultest/selecttestone?enrollno=er`, {headers: this.getHeaders2()})
  //   //   .map((res:Response) => res.json())
  //   //   .catch(this.handleError);
  //   //   //alert("getDisplayAll2 after");
  //   //   return complaints1$; 

  //   let headers1 = new Headers();
  //   headers1.append('Content-Type', 'application/x-www-form-urlencoded');
  //   //headers1.append('Content-Type', 'application/json' );
  //   //headers1.append('input', JSON.stringify( inparam));
  //   //var body1 = `input=${JSON.stringify( inparam)}`;
  //   //console.log(body1);
  //   //var url2 = `http://localhost:8080/Atultest/rest/atultest/insertTestone?` + body1;
  //   var url2 = `http://localhost:8080/TaskManagerWS/rest/atultest/drpproject`;
  //   console.log(url2);
  //   let complaints1$ = this.http
  //     .post(url2  ,{headers: headers1})
  //     .map((res:Response) => res.json())
  //     .catch(this.handleError);
  //     //alert("getDisplayAll2 after");
  //     return complaints1$; 

  // }
 
  

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

