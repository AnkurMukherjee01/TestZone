import { Component } from '@angular/core';
import {Router} from '@angular/router';
import { RestService } from "../rest.service";
import {TokenStorage} from '../token.storage';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
 
  constructor(private router: Router,private _restService: RestService,private token: TokenStorage) { }
  signout(){
    this.token.signOut();
    this.router.navigate(['']);
  }
}
