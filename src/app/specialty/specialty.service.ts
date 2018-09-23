import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';

import { environment } from '../../environments/environment';
import { Specialty } from './specialty.model';

@Injectable()
export class SpecialtyService {
  private endpoint: string = environment.apiBaseUrl + "/specialty";

  constructor(private http: HttpClient) { }

  list(): Observable<Specialty []> {
    return this.http.get(this.endpoint, this.jwt()).map(resp => <Specialty[]>resp);
  }

  save(specialty:Specialty): Observable<Specialty> {
    return this.http.post(this.endpoint, specialty, this.jwt()).map(resp => <Specialty>resp);
  }

  find(specialtyId:number): Observable<Specialty> {
    return this.http.get(`${this.endpoint}/${specialtyId}`, this.jwt()).map(resp => <Specialty>resp);
  }

  update(specialty:Specialty): Observable<Specialty> {
    return this.http.put(this.endpoint, specialty, this.jwt()).map(resp => <Specialty>resp);
  }

  delete(specialty:Specialty): Observable<any> {
    return this.http.delete(this.endpoint + '/' + specialty.id, this.jwt());
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
