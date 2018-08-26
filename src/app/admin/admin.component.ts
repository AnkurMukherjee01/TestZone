import { Component, OnInit } from '@angular/core';
import {MatTableModule,MatTableDataSource} from '@angular/material/table';
import { RestService } from "../rest.service";
import {Observable,Subscription } from 'rxjs';
import {TokenStorage} from '../token.storage';
import {Approval} from '../approval';
import {Router,ActivatedRoute, Params,  } from '@angular/router';
import {MatSnackBar, MatTabChangeEvent} from '@angular/material';
import {CreateTestModel} from '../create-test-model';
import {FormControl} from '@angular/forms';
import {map, startWith} from 'rxjs/operators';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  displayedColumns: string[] = ['name', 'email', 'approval', 'batchName'];
  dataSourceApproval =  new MatTableDataSource(); 
  approval:Approval[];
  msg:string[];
  ourFile: File;
  testUploadFile:File;
  testUploadAssignFile:File;
  createTestModel= new CreateTestModel('','60','M','');
testList: string[];
studentControlMcq = new FormControl();
  optionsMcq: string[] ;
  optionsMcqFilter: Observable<string[]>;
  batchName:String="abv";



  constructor(private router: Router,private _restService: RestService,private token: TokenStorage,private snackBar: MatSnackBar) { 
    this.msg=[];
  }

  ngOnInit() {
    this.pendingApproval();
   this._restService.getTestName().subscribe(
     data=>{
       console.log(data);
this.testList=data.test.
filter(o=>o["testType"]=='M').map(o1=>o1["testName"])
     },
     error=>{

     }
   )
    this._restService.getEmployee('M').subscribe(name => {
      console.log(name)
      this.optionsMcq = name["name"] as string[]
      this.optionsMcqFilter = this.studentControlMcq.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filterMcq(value))
      );
  })
    
  }
  private _filterMcq(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.optionsMcq.filter(option => option["name"].toLowerCase().includes(filterValue));
  }
  approve(){
    console.log(this.approval)
    this._restService.updatependingapproval(this.approval).subscribe(
      data => {
        this.pendingApproval();
      },
      error=>{
        this.snackBar.open(error.error['errorMessage'],'Dismiss', {
          duration: 5000,
        });
      }
    );
  }

  pendingApproval(){
    this._restService.fetchPendingApproval().subscribe(
      data => {
      this.approval=data['pendingApproval']
      this.dataSourceApproval.data =this.approval;
        return true;
      },
      error => {
        console.error(error);
        this.token.signOut();
        this.router.navigate(['']);
      }
    );
  }

  openInput(){ 
    // your can use ElementRef for this later
    document.getElementById("fileInput").click();
  }

  fileChange(files: File[]) {
    if (files.length > 0) {
      this.ourFile = files[0];
    }
  }


   /**
   * this is used to perform the actual upload
   */
   upload() {
    console.log('sending this to server', this.ourFile);

    var myReader: FileReader = new FileReader();

        myReader.onloadend = (e) => {
          console.log('sending this to server', (myReader.result));
          this._restService.createBulkLogin(myReader.result).subscribe(
            data => {
              this.snackBar.open(data['success'],'Dismiss', {
                duration: 5000,
              });
            },
            error=>{
              this.snackBar.open(error.error['errorMessage'],'Dismiss', {
                duration: 5000,
              });
            }
          );
          this.ourFile=null;
        }
        myReader.readAsDataURL(this.ourFile);
  }

  openTestInput(){ 
    // your can use ElementRef for this later
    document.getElementById("fileTestInput").click();
  }

  fileTestChange(files: File[]) {
    if (files.length > 0) {
      this.testUploadFile = files[0];
    }
  }


   /**
   * this is used to perform the actual upload
   */
   uploadTest() {
    console.log('sending this to server', this.ourFile);

    var myReader: FileReader = new FileReader();

        myReader.onloadend = (e) => {
          console.log('sending this to server', (myReader.result));
          this.createTestModel.testFile=myReader.result.split("base64,")[1];
          this._restService.createTest(this.createTestModel).subscribe(
            data => {
              this.snackBar.open(data['success'],'Dismiss', {
                duration: 5000,
              });
            },
            error=>{
              this.snackBar.open(error.error['errorMessage'],'Dismiss', {
                duration: 5000,
              });
            }
          );
          this.createTestModel = new CreateTestModel('','60','M','');
          this.testUploadFile=null;
        }
        myReader.readAsDataURL(this.testUploadFile);
  }
  openAssignTestInput(){ 
    // your can use ElementRef for this later
    document.getElementById("fileAssignTestInput").click();
  }

  fileAssignTestChange(files: File[]) {
    if (files.length > 0) {
      this.testUploadAssignFile = files[0];
    }
  }


   /**
   * this is used to perform the actual upload
   */
  uploadAssignTest() {
    console.log('sending this to server', this.testUploadAssignFile);

    var myReader: FileReader = new FileReader();

        myReader.onloadend = (e) => {
          console.log('sending this to server', (myReader.result));
          this._restService.assignBulkTest(myReader.result).subscribe(
            data => {
              this.snackBar.open(data['success'],'Dismiss', {
                duration: 5000,
              });
            },
            error=>{
              this.snackBar.open(error.error['errorMessage'],'Dismiss', {
                duration: 5000,
              });
            }
          );
          this.testUploadAssignFile=null;
        }
        myReader.readAsDataURL(this.testUploadAssignFile);
  }
  onAssignTabClick(event: MatTabChangeEvent) {
    if(event.index==1){
      this._restService.getEmployee('A').subscribe(name => {
        this.optionsMcq = name["name"] as string[]
    })
      this.optionsMcqFilter = this.studentControlMcq.valueChanges
        .pipe(
          startWith(''),
          map(value => this._filterMcq(value))
        );

        this._restService.getTestName().subscribe(
          data=>{
     this.testList=data.test.filter(o=>o["testType"]=='A').map(o1=>o1["testName"])
          },
          error=>{
     
          }
        )
    }
    else{
      this._restService.getEmployee('M').subscribe(name => {
        this.optionsMcq = name["name"] as string[]
    })
      this.optionsMcqFilter = this.studentControlMcq.valueChanges
        .pipe(
          startWith(''),
          map(value => this._filterMcq(value))
        );

        this._restService.getTestName().subscribe(
          data=>{
     this.testList=data.test.filter(o=>o["testType"]=='M').map(o1=>o1["testName"])
          },
          error=>{
     
          }
        )
    }
  }

  onAssignSelect(option,test){
    console.log(option);
    this._restService.assignTest(option['option'].value,test).subscribe(
      data => {
        this.snackBar.open(data['success'],'Dismiss', {
          duration: 5000,
        });
      },
      error=>{
        this.snackBar.open(error.error['message'],'Dismiss', {
          duration: 5000,
        });
      }
    );
  }

  deleteTest(test){
    console.log("test"+test);
    this._restService.deleteTest(test).subscribe(
      data => {
        this.snackBar.open(data['success'],'Dismiss', {
          duration: 5000,
        });
      },
      error=>{
        this.snackBar.open(error.error['message'],'Dismiss', {
          duration: 5000,
        });
      }
    );
  }
}