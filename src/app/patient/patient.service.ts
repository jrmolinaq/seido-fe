import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';

import { environment } from '../../environments/environment';
import { Patient } from './patient.model';

@Injectable()
export class PatientService {
  private endpoint: string = environment.apiBaseUrl + "/patient";

  constructor(private http: HttpClient) { }

  list(): Observable<Patient []> {
    return this.http.get(this.endpoint, this.jwt()).map(resp => <Patient[]>resp);
  }

  save(patient: Patient): Observable<Patient> {
    return this.http.post(this.endpoint, patient, this.jwt()).map(resp => <Patient>resp);
  }

  find(patientId: number): Observable<Patient> {
    return this.http.get(`${this.endpoint}/${patientId}`, this.jwt()).map(resp => <Patient>resp);
  }

  search(searchTerm: string): Observable<Patient> {
    return this.http.get(`${this.endpoint}/search/${searchTerm}`, this.jwt()).map(resp => <Patient>resp);
  }

  update(patient: Patient): Observable<Patient> {
    return this.http.put(this.endpoint, patient, this.jwt()).map(resp => <Patient>resp);
  }

  delete(patient: Patient): Observable<any> {
    return this.http.delete(this.endpoint + '/' + patient.id, this.jwt());
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
