import { Component, OnInit ,ViewChild} from '@angular/core';
import {TokenStorage} from '../token.storage'
import {Router} from '@angular/router';
import {MatSort, MatTableDataSource, MatSnackBar,} from '@angular/material';
import { RestService } from "../rest.service";
import {DomSanitizer} from '@angular/platform-browser';
import {MatIconRegistry} from '@angular/material';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {
  @ViewChild(MatSort) sort: MatSort;
  lastLogin:string ;
  minExp:string;
  maxExp:string;
  testName:string;
  marks:string
  displayedColumnsReport: string[] = ['email', 'name','phNo', 'lastLogin', 'marks','exp'];
  displayedColumnsEnquiry: string[] = ['email', 'name','phoneNo', 'course', 'subject','message','createdtime'];
  testList: string[];
  dataSourceReport = new MatTableDataSource();
  dataSourceEnquiry = new MatTableDataSource();
  reportData
  Math:any;
  constructor(private token:TokenStorage,private router: Router, private _restService: RestService, private snackBar: MatSnackBar) { }

  ngOnInit() {
    if(!this.token.getToken() ||!(this.token.getToken() && this.token.getIsAdmin()=="true")){
      this.router.navigate([''])
  }
  else{
    this.Math = Math;
    this._restService.getTestName().subscribe(
      data => {
        this.testList = data.test.
          filter(o => o["testType"] == 'M').map(o1 => {
            
            return o1["testName"]
          })

      },
      error => {

      }
    )}
  }

  getReport(){
    if(this.lastLogin && this.testName){
      var d = new Date();
      d.setMonth(d.getMonth() - Number(this.lastLogin))
      this._restService.getStudentReport(d,this.minExp,this.maxExp,this.testName,this.marks).subscribe(
        data => {
          this.reportData=data[0]
        this.dataSourceReport.data = data["user"];
        this.dataSourceReport.sort = this.sort;
        return true;
      },
      error => {
        this.token.signOut();
        this.router.navigate(['']);
      }
    );
    }
  }

  getEnquiry(value){
    var date=new Date()
    if(value!="All"){     
      date.setMonth(date.getMonth() - value);
    }
    else{
      date = new Date(2018, 1,1,0,0,0,0);
    }
    this._restService.getEnquiry(date).subscribe(
      data =>{
        this.dataSourceEnquiry.data = data["student"];
        this.dataSourceReport.sort = this.sort;
        return true;
      },
      error => {
        this.snackBar.open(error.error["err"], 'Dismiss', {
          duration: 5000,
        });
      }
    )
  }
}
