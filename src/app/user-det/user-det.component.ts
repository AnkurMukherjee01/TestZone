import { Component, OnInit , ViewChild} from '@angular/core';
import {MatTableModule,MatPaginator, MatTableDataSource} from '@angular/material';
import { RestService } from "../rest.service";
import {Observable,Subscription } from 'rxjs';
import {Router,ActivatedRoute, Params,  } from '@angular/router';
import {MatSnackBar, MatTabChangeEvent} from '@angular/material';
import {FormControl} from '@angular/forms';
import {map, startWith} from 'rxjs/operators';
import  {UserEntryDetComponent} from '../user-entry-det/user-entry-det.component'
import {MatDialog} from '@angular/material';

@Component({
  selector: 'app-user-det',
  templateUrl: './user-det.component.html',
  styleUrls: ['./user-det.component.css']
})
export class UserDetComponent implements OnInit {
  displayedColumnsBatch: string[] = ['email', 'name', 'approval', 'lastLogin','batchName'];
  dataSourceBatch =  new MatTableDataSource(); 
  selectedTest:String='';
batchList:{}[]=[]
  constructor(private router: Router,private _restService: RestService,private snackBar: MatSnackBar,public dialog: MatDialog) {  }
  @ViewChild(MatPaginator) paginator: MatPaginator;
  ngOnInit() {
    this.dataSourceBatch.paginator = this.paginator;
    this._restService.getBatchList().subscribe(
      data=>{
 this.batchList= Array.from(new Set(data['batch']));

      },
      error=>{
 
      })
  }

  getUserDetail(selected){
    this._restService.getUserDetails(selected).subscribe(
      data => {
        this.selectedTest=selected
       this.dataSourceBatch.data =data['user'];
      // this.percentile= data[' percentile'];
        return true;
      },
      error => {
        this.router.navigate(['']);
      }
   );
  }

  changeBatch(selected,email){
    this._restService.changeBatch(selected,email).subscribe(
      data=>{
        this._restService.getUserDetails(selected).subscribe(
          data => {
            this.selectedTest=selected
           this.dataSourceBatch.data =data['user'];
          // this.percentile= data[' percentile'];
          this.snackBar.open(data['success'], 'Dismiss', {
            duration: 5000,
          });
          },
          error => {
            this.router.navigate(['']);
          });
      },
      error=>{
        this.snackBar.open(error['error'], 'Dismiss', {
          duration: 5000,
        });
      }
    )
  }

  openStudentDetails(email){
    let data=this.dataSourceBatch.data.filter(o=>o["email"]==email);
    console.log(data)
    this.dialog.open(UserEntryDetComponent, {
      disableClose:false,
     width: '50%',
     height:'400px',
     data: {phNo:data[0]["phNo"] ,
       education:data[0]["education"],
       exp:data[0]["exp"],
       qualification:data[0]["qualification"]}
   });
  }
}
