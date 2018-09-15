import { Component, OnInit} from '@angular/core';
import {MatTableModule,MatTableDataSource} from '@angular/material/table';
import { RestService } from "../rest.service";
import {Observable,Subscription } from 'rxjs';
import { LoginComponent } from "../login/login.component";
import {MCQ} from '../mcq';
import {Router,ActivatedRoute, Params,  } from '@angular/router';
import {TokenStorage} from '../token.storage';

const ELEMENT_DATA: MCQ[] = [
  {position: 1, testName: 'Hydrogen', date: 1.0079, mark: 'H'},
  {position: 2, testName: 'Helium', date: 4.0026, mark: 'He'},
  {position: 3, testName: 'Lithium', date: 6.941, mark: 'Li'},
  {position: 4, testName: 'Beryllium', date: 9.0122, mark: 'Be'},
  {position: 5, testName: 'Boron', date: 10.811, mark: 'B'},
  {position: 6, testName: 'Carbon', date: 12.0107, mark: 'C'},
  {position: 7, testName: 'Nitrogen', date: 14.0067, mark: 'N'},
  {position: 8, testName: 'Oxygen', date: 15.9994, mark: 'O'},
  {position: 9, testName: 'Fluorine', date: 18.9984, mark: 'F'},
  {position: 10, testName: 'Neon', date: 20.1797, mark: 'Ne'},
];

@Component({
  selector: 'app-mcqtest',
  templateUrl: './mcq-test.component.html',
  styleUrls: ['./mcq-test.component.css']
})
export class McqTestComponent implements OnInit {

  displayedColumns: string[] = ['position', 'testName','assignedDate', 'date', 'mark'];
  displayedColumnsRank: string[] = ['position', 'testNameRank', 'marksRank'];
  dataSource =  new MatTableDataSource(); 
  dataSourceResult =  new MatTableDataSource(); 
  email:String;
  selectedTest:String;
  testNameList:String[]=[];
  percentile:String;
  private sub: Subscription;
  
  constructor(private router: Router,private _restService: RestService,private token: TokenStorage,private route: ActivatedRoute) { }

  ngOnInit() {
    console.log("in in it");
    this.email = this.route.snapshot.paramMap.get('email');
    console.log(this.email);
    this._restService.mcq(this.email).subscribe(
      data => {
        // refresh the list
       // this.getFoods();
      // console.log(data);
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
  console.log(element.testName);
  this.router.navigate(['/mcqTest',element.testName,element.assigneddate]);
}
compare(a,b) {
  if (a.marks < b.marks)
    return 1;
  if (a.marks > b.marks)
    return -1;
  return 0;
}
getMarks(selected){
  console.log(selected);
  this._restService.getRank(selected).subscribe(
    data => {
      // refresh the list
     // this.getFoods();
    console.log(data);
     this.dataSourceResult.data =data['userDet'].sort(this.compare);
     this.percentile= data[' percentile'];
      return true;
    },
    error => {
      console.error(error.data);
      this.router.navigate(['']);
    }
 );
}
   
  }


