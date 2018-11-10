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
    return this.http.post('http://localhost:3000/api/login', JSON.stringify(loginDet),httpOptions);
  }

}
