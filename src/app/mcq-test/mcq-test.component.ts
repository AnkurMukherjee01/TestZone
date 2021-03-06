import { Component, OnInit} from '@angular/core';
import {MatTableModule,MatTableDataSource} from '@angular/material/table';
import { RestService } from "../rest.service";
import {Observable,Subscription } from 'rxjs';
import { LoginComponent } from "../login/login.component";
import {MCQ} from '../mcq';
import {Router,ActivatedRoute, Params,  } from '@angular/router';
import {TokenStorage} from '../token.storage';
import {MatDialog} from '@angular/material';
import  {UserEntryDetComponent} from '../user-entry-det/user-entry-det.component'

@Component({
  selector: 'app-mcqtest',
  templateUrl: './mcq-test.component.html',
  styleUrls: ['./mcq-test.component.css']
})
export class McqTestComponent implements OnInit {

  displayedColumns: string[] = ['position', 'testName','assignedDate', 'date', 'mark','percentage'];
  displayedColumnsRank: string[] = ['position', 'testNameRank', 'marksRank'];
  dataSource =  new MatTableDataSource(); 
  dataSourceResult =  new MatTableDataSource(); 
  email:String;
  selectedTest:String;
  testNameList:String[]=[];
  percentile:String;
  private sub: Subscription;
  
  constructor(private router: Router,private _restService: RestService,private token: TokenStorage,private route: ActivatedRoute,public dialog: MatDialog) { }

  ngOnInit() {
    this.email = this.route.snapshot.paramMap.get('email');
   
    this._restService.mcq(this.email).subscribe(
      data => {

 if(!data["phno"] || !data["education"] || !data["exp"] || !data["qualification"]){

   const dialogRef =this.dialog.open(UserEntryDetComponent, {
     disableClose:true,
    width: '50%',
    height:'400px',
    data: {phNo:data["phno"] ,
      education:data["education"],
      exp:data["exp"],
      qualification:data["qualification"]}
  });
 }
       this.dataSource.data =data['testDet'].reverse();
       this.testNameList= (data['testDet'].filter(x => x.marks >-1).map(y=>y.testName)).filter(function (el, index, array) { 
        return array.indexOf (el) == index;
      });
        return true;
      },
      error => {
        console.error('in err');
        this.token.signOut();
        this.router.navigate(['']);
      }
   );
}
// filterItemsOfType(type){
//   return this.dataSource.data.filter(x => x.marks == type);
// }

start(element){
  this.router.navigate(['/mcqTest',element.testName,element.assigneddate]);
}
compare(a,b) {
  if (a.marks < b.marks)
    return 1;
  if (a.marks > b.marks)
    return -1;
  return 0;
}
comparePercentage(a,b) {
  if (a.marks/a.totalQuestion < b.marks/b.totalQuestion)
    return 1;
  if (a.marks/a.totalQuestion > b.marks/b.totalQuestion)
    return -1;
  return 0;
}
getMarks(selected){
  this._restService.getRank(selected).subscribe(
    data => {
    if(this.totalQuestionExist(data['userDet'])){
      this.dataSourceResult.data =data['userDet'].sort(this.comparePercentage);
    }
    else{
      this.dataSourceResult.data =data['userDet'].sort(this.compare);
    }
     
     this.percentile= data[' percentile'];
      return true;
    },
    error => {
      console.error(error.data);
      this.token.signOut();
      this.router.navigate(['']);
    }
 );
}
totalQuestionExist(user){
  let usrDet=true;
  user.map(o=>{if(!user.totalQuestion) usrDet=false})
  return usrDet;
}
round = function(num) {
  return +(Math.round(num*100) /100 );
}
   
  }


