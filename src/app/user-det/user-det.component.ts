import { Component, OnInit , ViewChild} from '@angular/core';
import {MatTableModule,MatPaginator, MatTableDataSource} from '@angular/material';
import { RestService } from "../rest.service";
import {Observable,Subscription } from 'rxjs';
import {Router,ActivatedRoute, Params,  } from '@angular/router';
import {MatSnackBar, MatTabChangeEvent} from '@angular/material';
import {FormControl} from '@angular/forms';
import {map, startWith} from 'rxjs/operators';

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
  constructor(private router: Router,private _restService: RestService,private snackBar: MatSnackBar) {  }
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

  changeBatch(selected){
    this._restService.changeBatch(selected).subscribe(
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

}
