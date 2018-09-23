import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';

import { environment } from '../../environments/environment';
import { Survey } from '../survey/survey.model';

@Injectable()
export class SurveyService {
  constructor(private http: HttpClient) { }

  list(patientId: number) : Observable<Survey []> {
    let url: string = this.buildApiUrl(patientId);

    return this.http.get(url, this.jwt()).map(resp => <Survey[]>resp);
  }

  find(patientId: number, surveyId: number) : Observable<Survey> {
    let url: string = this.buildApiUrl(patientId, surveyId);

    return this.http.get(url, this.jwt()).map(resp => <Survey>resp);
  }

  update(patientId: number, survey: Survey) : Observable<Survey> {
    let url: string = this.buildApiUrl(patientId);

    return this.http.put(url, survey, this.jwt()).map(resp => <Survey>resp);
  }
  
  // private helper methods

  private buildApiUrl(patientId:number, surveyId?:number) : string {
    return `${environment.apiBaseUrl}/patient/${patientId}/survey/${surveyId || ''}`;
  }

  private jwt() {
    // create authorization header with jwt token
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser && currentUser.token) {
        let headers = new HttpHeaders({ 'Authorization': 'Bearer ' + currentUser.token });
        return { headers: headers };
    }
  }
}
