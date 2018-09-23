import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';

import { environment } from '../../environments/environment';
import { Event } from './event.model';

@Injectable()
export class EventService {
  private endpoint: string = environment.apiBaseUrl + "/patient/";
  private eventEndpoint: string = "/event";

  constructor(private http: HttpClient) { }

  list(patientId: number): Observable<Event []> {
    let url = `${this.endpoint}${patientId}${this.eventEndpoint}`;

    return this.http.get(url, this.jwt()).map(resp => <Event[]>resp);
  }

  save(patientId: number, event: Event): Observable<Event> {
    let url = `${this.endpoint}${patientId}${this.eventEndpoint}`;

    return this.http.post(url, event, this.jwt()).map(resp => <Event>resp);
  }

  find(patientId: number, eventId: number): Observable<Event> {
    let url = `${this.endpoint}${patientId}${this.eventEndpoint}/${eventId}`;

    return this.http.get(url, this.jwt()).map(resp => <Event>resp);
  }

  update(patientId: number, event: Event): Observable<Event> {
    let url = `${this.endpoint}${patientId}${this.eventEndpoint}`;

    return this.http.put(url, event, this.jwt()).map(resp => <Event>resp);
  }

  delete(patientId: number, event: Event): Observable<any> {
    let url = `${this.endpoint}${patientId}${this.eventEndpoint}/${event.id}`;

    return this.http.delete(url, this.jwt());
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
