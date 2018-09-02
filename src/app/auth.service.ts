import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Login } from './login';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class AuthService {

 // baseUrl: 'http://139.59.74.138/';
  baseUrl: 'http://localhost:3000/';
  constructor(private http: HttpClient) {
  }

  attemptAuth(loginDet:Login): Observable<object> {
    
    console.log('attempAuth ::'+JSON.stringify(loginDet));
    return this.http.post('https://www.completeanalytics.in/api/login', JSON.stringify(loginDet),httpOptions);
  }

}
