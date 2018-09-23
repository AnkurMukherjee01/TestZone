import { Component, OnInit } from '@angular/core';
import {TokenStorage} from '../token.storage'
import {Router} from '@angular/router';

@Component({
  selector: 'app-admin-student',
  templateUrl: './admin-student.component.html',
  styleUrls: ['./admin-student.component.css']
})
export class AdminStudentComponent implements OnInit {

  constructor(private token:TokenStorage,private router: Router) { }

  ngOnInit() {
    if(!this.token.getToken() ||!(this.token.getToken() && this.token.getIsAdmin()=="true")){
        this.router.navigate([''])
    }
  }

}
