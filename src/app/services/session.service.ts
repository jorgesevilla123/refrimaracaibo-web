import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  API = 'http://localhost:4300/api/sessions'

  constructor(
    private http: HttpClient
  ) { }


  getProfile(): Observable<any>{
    return this.http.get(`${this.API}/get-session`)
  }



  // checkSession(): Observable<any>{
  //   return this.http.get(`${this.API}/check-session`)


  // }




}
