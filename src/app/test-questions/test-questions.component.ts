import {Component, Inject,OnInit} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { RestService } from "../rest.service";
import { Observable, Subscription, of } from 'rxjs';
import { TokenStorage } from '../token.storage';
import { Router, ActivatedRoute, Params, } from '@angular/router';
import { MatSnackBar, MatTabChangeEvent } from '@angular/material';

@Component({
  selector: 'app-test-questions',
  templateUrl: './test-questions.component.html',
  styleUrls: ['./test-questions.component.css']
})
export class TestQuestionsComponent implements OnInit {

  questions:any[]=[]

  constructor(private router: Router, private _restService: RestService, private token: TokenStorage, private snackBar: MatSnackBar,public dialogRef: MatDialogRef<TestQuestionsComponent>,
    @Inject(MAT_DIALOG_DATA) public testName: string) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
    this._restService.getTestQuestion(this.testName["testName"]).subscribe(
      data=>{
        for(var i=0;i<data["test"][0].tests.length;i++){
          this.questions.push({
            question:data["test"][0].tests[i].question,
            image:""
          })
        }
          //this.questions.push= data["test"][0].tests.map(o=>o.questions)
      },
      error=>{
 
      })
  }

  upload() {
      this._restService.updateQuestions(this.questions,this.testName["testName"]).subscribe(
        data => {
          this.snackBar.open(data['success'], 'Dismiss', {
            duration: 5000,
          });
          this.dialogRef.close();
        },
        error => {
          this.snackBar.open(error.error['errorMessage'], 'Dismiss', {
            duration: 5000,
          });
        }
      );
     
  }

  openTestInput() {
    // your can use ElementRef for this later
    document.getElementById("fileImageInput").click();
  }

  fileImageChange(files: File[],index) {
    var myReader: FileReader = new FileReader();
    if (files.length > 0) {
      myReader.readAsDataURL(files[0]);
     // this.questions[index].image = files[0];
    }
    myReader.onloadend = (e) => {
  
     this.questions[index].image=myReader.result
    }
  }
}
