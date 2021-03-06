import { Component, OnInit } from '@angular/core';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import {MatDialog,MatDialogRef} from '@angular/material';
import { RestService } from "../rest.service";
import { Observable, Subscription, of } from 'rxjs';
import { TokenStorage } from '../token.storage';
import { Approval } from '../approval';
import { Router, ActivatedRoute, Params, } from '@angular/router';
import { MatSnackBar, MatTabChangeEvent } from '@angular/material';
import { CreateTestModel } from '../create-test-model';
import { FormControl } from '@angular/forms';
import { map, startWith } from 'rxjs/operators';
import { AssignTest } from '../assign-test'
import { TestQuestionsComponent } from "../test-questions/test-questions.component";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  displayedColumns: string[] = ['name', 'email', 'approval', 'batchName'];
  dataSourceApproval = new MatTableDataSource();
  approval: Approval[];
  msg: string[];
  ourFile: File;
  testUploadFile: File;
  testUploadAssignFile: File;
  createTestModel = new CreateTestModel('', '60', 'M', '','');
  testList: string[];
  studentControlMcq = new FormControl();
  optionsMcq: string[];
  optionsMcqFilter: Observable<string[]>;
  optionsMcqFilterBatch: Observable<string[]>;
  batchNameModel: String = "";
  testName: AssignTest[] = []
  batchList=[]
  selectedStatus = "student"


  constructor(private router: Router, private _restService: RestService, private token: TokenStorage, private snackBar: MatSnackBar,public dialog: MatDialog) {
    this.msg = [];
  }

  ngOnInit() {
    this._restService.getBatchList().subscribe(
      data=>{
 this.batchList= Array.from(new Set(data['batch']));
      },
      error=>{
 
      })
    this.pendingApproval();
    this._restService.getTestName().subscribe(
      data => {
        this.testList = data.test.
          filter(o => o["testType"] == 'M').map(o1 => {
            this.testName.push(new AssignTest(
              o1["testName"],
              "",""
            ))
            return o1["testName"]
          })

      },
      error => {

      }
    )
    this._restService.getEmployee('M').subscribe(name => {
      this.optionsMcq = name["name"] as string[]
    })

  }
  doFilter(index){
    this.optionsMcqFilter =  of(this._filterMcq(this.testName[index]["email"]))
  }
  doFilterBatch(index){
    this.optionsMcqFilterBatch =  of(this._filterMcqBatch(this.testName[index]["batchName"]))
    console.log(this.optionsMcqFilterBatch)
  }

  private _filterMcq(value: string): string[] {
    
    const filterValue = value.toLowerCase();
    return this.optionsMcq.filter(option => option["name"].toLowerCase().indexOf(value.toLowerCase())===0);
  }
  private _filterMcqBatch(value: string): string[] {
    console.log(this.batchList)
    const filterValue = value.toLowerCase();
    return this.batchList.filter(option => option.toLowerCase().indexOf(value.toLowerCase())===0);
  }
  approve() {
    this._restService.updatependingapproval(this.approval).subscribe(
      data => {
        this.pendingApproval();
        this.snackBar.open(data['success'], 'Dismiss', {
          duration: 5000,
        });
      },
      error => {
        this.snackBar.open(error.error['errorMessage'], 'Dismiss', {
          duration: 5000,
        });
      }
    );
  }

  pendingApproval() {
    this._restService.fetchPendingApproval().subscribe(
      data => {
        this.approval = data['pendingApproval']
        this.dataSourceApproval.data = this.approval;
        return true;
      },
      error => {
        this.token.signOut();
        this.router.navigate(['']);
      }
    );
  }

  openInput() {
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
    var myReader: FileReader = new FileReader();

    myReader.onloadend = (e) => {
      this._restService.createBulkLogin(myReader.result).subscribe(
        data => {
          this.snackBar.open(data['success'], 'Dismiss', {
            duration: 5000,
          });
        },
        error => {
          this.snackBar.open(error.error['errorMessage'], 'Dismiss', {
            duration: 5000,
          });
        }
      );
      this.ourFile = null;
    }
    myReader.readAsDataURL(this.ourFile);
  }

  openTestInput() {
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
if(this.testUploadFile==undefined || this.testUploadFile==null)
{
  this.createTestModel.testFile = "";
  this._restService.createTest(this.createTestModel).subscribe(
    data => {
      this.snackBar.open(data['success'], 'Dismiss', {
        duration: 5000,
      });
      this._restService.getTestName().subscribe(
        data => {
          this.testList = data.test.
            filter(o => o["testType"] == 'M').map(o1 => {
              this.testName.push(new AssignTest(
                o1["testName"],
                "",""
              ))
              return o1["testName"]
            })
            this.createTestModel = new CreateTestModel('', '60', 'M','','');
        },
        error => {
          this.createTestModel = new CreateTestModel('', '60', 'M', '','');
        }
      )
    },
    error => {
      this.snackBar.open(error.error['errorMessage'], 'Dismiss', {
        duration: 5000,
      });
    }
  );
  
  this.testUploadFile = null;
}

else{
    var myReader: FileReader = new FileReader();

    myReader.onloadend = (e) => {
      this.createTestModel.testFile = myReader.result.split("base64,")[1];
      this._restService.createTest(this.createTestModel).subscribe(
        data => {
          this.snackBar.open(data['success'], 'Dismiss', {
            duration: 5000,
          });
          this._restService.getTestName().subscribe(
            data => {
              this.testList = data.test.
                filter(o => o["testType"] == 'M').map(o1 => {
                  this.testName.push(new AssignTest(
                    o1["testName"],"",
                    ""
                  ))
                  return o1["testName"]
                })
                this.createTestModel = new CreateTestModel('', '60', 'M','','');
            },
            error => {
              this.createTestModel = new CreateTestModel('', '60', 'M', '','');
            }
          )
        },
        error => {
          this.snackBar.open(error.error['errorMessage'], 'Dismiss', {
            duration: 5000,
          });
        }
      );
      
      this.testUploadFile = null;
    }
    myReader.readAsDataURL(this.testUploadFile);
  }
  }

  openAssignTestInput() {
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
    var myReader: FileReader = new FileReader();

    myReader.onloadend = (e) => {
      this._restService.assignBulkTest(myReader.result).subscribe(
        data => {
          this.snackBar.open(data['success'], 'Dismiss', {
            duration: 5000,
          });
        },
        error => {
          this.snackBar.open(error.error['errorMessage'], 'Dismiss', {
            duration: 5000,
          });
        }
      );
      this.testUploadAssignFile = null;
    }
    myReader.readAsDataURL(this.testUploadAssignFile);
  }
  onAssignTabClick(event: MatTabChangeEvent) {
    if (event.index == 1) {
      this._restService.getEmployee('A').subscribe(name => {
        this.optionsMcq = name["name"] as string[]
      })
      this.optionsMcqFilter = this.studentControlMcq.valueChanges
        .pipe(
          startWith(''),
          map(value => this._filterMcq(value))
        );

      this._restService.getTestName().subscribe(
        data => {
          this.testList = data.test.filter(o => o["testType"] == 'A').map(o1 => {
            this.testName.push(new AssignTest(
              o1["testName"],
              "",""
            ));
            return o1["testName"]
          })
        },
        error => {

        }
      )
    }
    else {
      this._restService.getEmployee('M').subscribe(name => {
        this.optionsMcq = name["name"] as string[]
      })
      this.optionsMcqFilter = this.studentControlMcq.valueChanges
        .pipe(
          startWith(''),
          map(value => this._filterMcq(value))
        );

      this._restService.getTestName().subscribe(
        data => {
          this.testList = data.test.filter(o => o["testType"] == 'M').map(o1 => o1["testName"])
        },
        error => {

        }
      )
    }
  }

  onAssignSelect(option, test) {
    console.log(option);
    console.log(JSON.stringify(this.testName))
  }

  deleteTest(test) {
    this._restService.deleteTest(test).subscribe(
      data => {
        this.snackBar.open(data['success'], 'Dismiss', {
          duration: 5000,
        });
        this._restService.getTestName().subscribe(
          data => {
            this.testList = data.test.
              filter(o => o["testType"] == 'M').map(o1 => {
                this.testName.push(new AssignTest(
                  o1["testName"],
                  "",""
                ))
                return o1["testName"]
              })
    
          },
          error => {
    
          }
        )
      },
      error => {
        this.snackBar.open(error.error['message'], 'Dismiss', {
          duration: 5000,
        });
      }
    );
  }

  assignTest(index, test) {
    if(this.selectedStatus=="student"){
    this._restService.assignTest(this.testName[index]['email'], test).subscribe(
      data => {
        this.snackBar.open(data['success'], 'Dismiss', {
          duration: 5000,
        });
        this.testName[index]['email'] = "";
      },
      error => {
        this.snackBar.open(error.error['message'], 'Dismiss', {
          duration: 5000,
        });
      }
    );
  }
  else if (this.selectedStatus=="batch"){
    //assignTestBatch
    this._restService.assignTestBatch(this.testName[index]['batchName'], test).subscribe(
      data => {
        this.snackBar.open(data['success'], 'Dismiss', {
          duration: 5000,
        });
        this.testName[index]['batchName'] = "";
      },
      error => {
        this.snackBar.open(error.error['message'], 'Dismiss', {
          duration: 5000,
        });
      }
    );
  }
  }

  createBatch(){
    this._restService.createBatch(this.batchNameModel).subscribe(
      data => {
        this.snackBar.open(data['success'], 'Dismiss', {
          duration: 5000,
        });
        this.batchNameModel = "";
      },
      error => {
        this.snackBar.open(error.error['error'], 'Dismiss', {
          duration: 5000,
        });
      }
    );
  }

  openDialog(test){
    const dialogRef = this.dialog.open(TestQuestionsComponent, {
      width: '80%',
      data: {testName: test}
    });

  }
}
