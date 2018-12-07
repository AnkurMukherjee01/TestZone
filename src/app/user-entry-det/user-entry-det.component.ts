import {Component, Inject,OnInit} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { RestService } from "../rest.service";
import { Observable, Subscription, of } from 'rxjs';
import { TokenStorage } from '../token.storage';
import { Router, ActivatedRoute, Params, } from '@angular/router';
import { MatSnackBar, MatTabChangeEvent } from '@angular/material';
import { AnimationPlayer } from '@angular/animations';

@Component({
  selector: 'app-user-entry-det',
  templateUrl: './user-entry-det.component.html',
  styleUrls: ['./user-entry-det.component.css']
})
export class UserEntryDetComponent implements OnInit {

qualification:String
education:string
yearsOfExperience:any
phoneNumber:string
monthsOfExperience:any

qualificationList:string[]=['B.A','B.Arch','BCA','B.B.A / B.M.S','B.Com','B.Ed','BDS','BHM','B.Pharma','B.Sc','B.Tech / B.E.','LLB','MBBS','Diploma','BVSC','BAMS','BHMS','B.El.Ed','B.P.Ed','B.Des.','BFA','B.U.M.S','Other']
  constructor(private _restService: RestService, private token: TokenStorage, private snackBar: MatSnackBar,public dialogRef: MatDialogRef<UserEntryDetComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string) { }

  ngOnInit() {
    this.qualification=this.data["qualification"]?this.data["qualification"]:"";
    this.education=this.data["education"]?this.data["education"]:"";
    this.yearsOfExperience=this.data["exp"]?Math.floor(this.data["exp"]/12):"";
    this.monthsOfExperience=this.data["exp"]?this.data["exp"]%12:"";
    this.phoneNumber=this.data["phNo"]?this.data["phNo"]:"";
  }
  updateEmpDet(){
    this._restService.updateUserDet(this.qualification,this.education,this.phoneNumber,this.yearsOfExperience*12+this.monthsOfExperience).subscribe(
      data=>{
        this.snackBar.open(data['success'], 'Dismiss', {
          duration: 5000,
        });
        this.dialogRef.close();
      },
      error=>{
 
      })
  }
}
