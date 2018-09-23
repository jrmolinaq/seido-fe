import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';

import { environment } from '../../environments/environment';
import { Company } from './company.model';

@Injectable()
export class CompanyService {
  private endpoint: string = environment.apiBaseUrl + "/company";

  constructor(
      private http: HttpClient) { }

  list() : Observable<Company []> {
    return this.http.get(this.endpoint, this.jwt()).map(resp => <Company[]> resp);
  }

  save(company: Company) : Observable<Company> {
    return this.http.post(this.endpoint, company, this.jwt()).map(resp => <Company>resp);
  }

  update(company: Company) : Observable<Company> {
    return this.http.put(this.endpoint, company, this.jwt()).map(resp => <Company>resp);
  }

  delete(company: Company) : Observable<any> {
    return this.http.delete(this.endpoint + '/' + company.id, this.jwt());
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
