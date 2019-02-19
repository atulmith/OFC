import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
// import { Milestone } from '../../milestone/milestone';
// import { FileUpload } from '../../milestone/fileupload';
// import { Dropdown1 } from '../../milestone/dropdown1';
// import 'rxjs/add/operator/do';  // for debugging

/**
 * This class provides the NameList service with methods to read names and add names.
 */
@Injectable()
export class BaseUrlService {

  /**
   * Creates a new NameListService with the injected Http.
   * @param {Http} http - The injected Http.
   * @constructor
   */
  // private baseUrl: string = 'http://localhost:8080/TaskManagerWS/rest/taskmanager/';
  //private baseUrl: string = 'http://192.168.0.55:8080/OFCAdmin/rest/';
  private baseUrl: string = 'http://www.ollomall.cn:8080/OFCAdmin/rest/';
  
  constructor(private http : Http){
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


 
  getBaseurl():string{
    return this.baseUrl;
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

