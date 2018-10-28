import { Component, OnInit } from '@angular/core';
import {MatTableModule,MatTableDataSource} from '@angular/material/table';
import { RestService } from "../rest.service";
import {Observable,Subscription } from 'rxjs';
import { LoginComponent } from "../login/login.component";
import {MCQ} from '../mcq';
import {Router,ActivatedRoute, Params,  } from '@angular/router';
import {TokenStorage} from '../token.storage';

@Component({
  selector: 'app-rank',
  templateUrl: './rank.component.html',
  styleUrls: ['./rank.component.css']
})
export class RankComponent implements OnInit {
  displayedColumnsRank: string[] = ['position', 'testNameRank', 'marksRank'];
  dataSourceResult =  new MatTableDataSource(); 
  selectedTest:String="";
  selectedBatch:String;
  testNameList:String[]=[];
batchList:any[]=[]

  constructor(private router: Router, private _restService: RestService,private token: TokenStorage,private route: ActivatedRoute) { }

  ngOnInit() {
    this._restService.getTestName().subscribe(
      data => {
        this.testNameList = data.test.map(o=>o.testName)
        this.selectedTest="None";
      },
      error => {
        
      }
    )

    this._restService.getBatchList().subscribe(
      data=>{
 this.batchList= Array.from(new Set(data['batch']));
this.selectedBatch=this.batchList[0]
      },
      error=>{
 
      })
  }
  getMarks(selected){
    this._restService.getRankBatch(selected,this.selectedBatch).subscribe(
      data => {
        // refresh the list
       // this.getFoods();
       this.dataSourceResult.data =data['userDet'].sort(this.compare);
       this.selectedTest="none"
       //this.percentile= data[' percentile'];
        return true;
      },
      error => {
        this.token.signOut();
        this.router.navigate(['']);
      }
   );
  }

  compare(a,b) {
    if (a.marks < b.marks)
      return 1;
    if (a.marks > b.marks)
      return -1;
    return 0;
  }
}
