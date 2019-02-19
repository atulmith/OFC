import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { TestOne } from '../../democomp/testone';
// import 'rxjs/add/operator/do';  // for debugging

/**
 * This class provides the NameList service with methods to read names and add names.
 */
@Injectable()
export class TestoneListService {

  /**
   * Creates a new NameListService with the injected Http.
   * @param {Http} http - The injected Http.
   * @constructor
   */
  private baseUrl: string = 'http://swapi.co/api';
  testone: TestOne;
  
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

  getUpdateAll(inparam: TestOne): Observable<TestOne[]>{
    //alert("getDisplayAll2 before");
    let headers1 = new Headers();
    headers1.append('Content-Type', 'application/x-www-form-urlencoded');
    //headers1.append('Content-Type', 'application/json' );
    //headers1.append('input', JSON.stringify( inparam));
    var body1 = `input=${JSON.stringify( inparam)}`;
    console.log(body1);
    //var url2 = `http://localhost:8080/Atultest/rest/atultest/insertTestone?` + body1;
    var url2 = `http://localhost:8081/Atultest/rest/atultest/insertTestone`;
    console.log(url2);
    let complaints1$ = this.http
      .post(url2 , body1 ,{headers: headers1})
      .map((res:Response) => res.json())
      .catch(this.handleError);
      //alert("getDisplayAll2 after");
      return complaints1$; 
  }

  submitUploadAndOthers(uploadedFiles: any[]):Observable<any>{
    let headers1 = new Headers();
    headers1.append('Content-Type', 'application/x-www-form-urlencoded');
    var body1 = `fileuploadarray=${JSON.stringify( uploadedFiles)}`;
    alert("body" + JSON.stringify(uploadedFiles))
    var url2 = `http://localhost:8080/TaskManagerWS/rest/atultest/submitfileupload`;
    

    //type MyType={issuccess:string};

    let myresult=this.http
      .post(url2,body1  ,{headers: headers1})
      .map((res:Response) => res.json())
      .catch(this.handleError);
    // alert("hh"+myresult.issuccess);  
    console.log("Mith:",myresult);
    console.log("mith2:",uploadedFiles);
    return myresult;  
  }

  getUpdateAll2(inparam: TestOne): Observable<TestOne[]>{
    //alert("getDisplayAll2 before");
    let headers1 = new Headers();
    headers1.append('Content-Type', 'application/x-www-form-urlencoded');
    //headers1.append('Content-Type', 'application/json' );
    //headers1.append('input', JSON.stringify( inparam));
    var body1 = `input=${JSON.stringify( inparam)}`;
    console.log(body1);
    //var url2 = `http://localhost:8080/Atultest/rest/atultest/insertTestone?` + body1;
    var url2 = `http://localhost:8081/Atultest/rest/atultest/updateTestone`;
    console.log(url2);
    let complaints1$ = this.http
      .post(url2 , body1 ,{headers: headers1})
      .map((res:Response) => res.json())
      .catch(this.handleError);
      //alert("getDisplayAll2 after");
      return complaints1$; 
  }

  getDisplayAll2(): Observable<TestOne[]>{
    //alert("getDisplayAll2 before");
    // let complaints1$ = this.http
    //   .post(`http://localhost:8080/Atultest/rest/atultest/selecttestone?enrollno=er`, {headers: this.getHeaders2()})
    //   .map((res:Response) => res.json())
    //   .catch(this.handleError);
    //   //alert("getDisplayAll2 after");
    //   return complaints1$; 

    let headers1 = new Headers();
    headers1.append('Content-Type', 'application/x-www-form-urlencoded');
    //headers1.append('Content-Type', 'application/json' );
    //headers1.append('input', JSON.stringify( inparam));
    //var body1 = `input=${JSON.stringify( inparam)}`;
    //console.log(body1);
    //var url2 = `http://localhost:8080/Atultest/rest/atultest/insertTestone?` + body1;
    var url2 = `http://localhost:8080/Atultest/rest/atultest/selecttestone?enrollno=hi`;
    console.log(url2);
    let complaints1$ = this.http
      .post(url2  ,{headers: headers1})
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

