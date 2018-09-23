import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';

import { environment } from '../../environments/environment';
import { User } from './user.model'; 
 
@Injectable()
export class UserService {
    private endpoint: string = environment.apiBaseUrl + "/users";
  
    constructor(private http: HttpClient) { }

    list(): Observable<User []> {
      return this.http.get(this.endpoint, this.jwt()).map(resp => <User[]>resp);
    }
    
    save(user: User): Observable<User> {
    return this.http.post(this.endpoint, user, this.jwt()).map(resp => <User>resp);
    }

    find(userId: number): Observable<User> {
        return this.http.get(`${this.endpoint}/${userId}`, this.jwt()).map(resp => <User>resp);
    }
    
    search(searchTerm: string): Observable<User> {
        return this.http.get(`${this.endpoint}/search/${searchTerm}`, this.jwt()).map(resp => <User>resp);
    }
    
    update(user: User): Observable<User> {
        return this.http.put(this.endpoint, user, this.jwt()).map(resp => <User>resp);
    }
    
    delete(user: User): Observable<any> {
        return this.http.delete(this.endpoint + '/' + user.id, this.jwt());
    }


 
    //getById(id: number) {
    //    return this.http.get('/api/users/' + id, this.jwt()).map((response: HttpResponse<any>) => response);
    //}
 
    //create(user: User) {
    //    return this.http.post('/api/users', user, this.jwt()).map((response: HttpResponse<any>) => response);
    //}
 
    //update(user: User) {
    //    return this.http.put('/api/users/' + user.id, user, this.jwt()).map((response: HttpResponse<any>) => response);
    //}
 
    //delete(id: number) {
    //    return this.http.delete('/api/users/' + id, this.jwt()).map((response: HttpResponse<any>) => response);
    //}
 
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