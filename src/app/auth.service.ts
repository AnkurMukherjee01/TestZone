import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Login } from './login';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class AuthService {

  baseUrl: 'http://localhost:3000/';

  constructor(private http: HttpClient) {
  }

  attemptAuth(loginDet:Login): Observable<object> {
    
    console.log('attempAuth ::'+JSON.stringify(loginDet));
    return this.http.post('http://localhost:3000/api/login', JSON.stringify(loginDet),httpOptions);
  }

}
