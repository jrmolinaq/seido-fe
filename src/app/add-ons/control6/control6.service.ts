import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Http, Headers, RequestOptions, ResponseContentType } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';

import { environment } from '../../../environments/environment';
import { Control6 } from './control6.model';

@Injectable()
export class Control6Service {
  private endpoint: string = environment.apiBaseUrl + "/addons/control6";

  constructor(private http: HttpClient, private http2: Http) { }
  
  downloadControl6Meses(): Observable<any> {
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));

    let headers = new Headers({'Authorization': 'Bearer ' + currentUser.token});
    let options = new RequestOptions( { headers: headers, responseType: ResponseContentType.Blob});

    let url: string = this.endpoint + "excel";
    return this.http2.get(url, options).map(resp => {return resp.blob()});
  }

  list() : Observable<Control6 []> {
    return this.http.get(this.endpoint, this.jwt()).map(resp => <Control6[]> resp);
  }

  // private helper methods

  private jwt() {
    // create authorization header with jwt token
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser && currentUser.token) {
        let headers = new HttpHeaders({ 'Authorization': 'Bearer ' + currentUser.token });
        return { headers: headers };
    }
  }
}
