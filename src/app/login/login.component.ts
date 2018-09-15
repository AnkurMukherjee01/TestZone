import { Component, OnInit } from '@angular/core';
import { Login }    from '../login';
import {SignUp} from '../signup';
import {ChangepasswordModel} from '../changepassword-model'
import { RestService } from "../rest.service";
import {Observable } from 'rxjs';
import {AuthService} from '../auth.service';
import {TokenStorage} from '../token.storage';
import {Router} from '@angular/router';
import {MatSnackBar} from '@angular/material';

// @Component({
//   selector: 'snack-bar-component',
//   templateUrl: 'snack-bar-component.html',
// })
// export class SnackBarComponentExample {
//   constructor(public snackBar: MatSnackBar) {}

//   openSnackBar() {
//     this.snackBar.openFromComponent(LoginComponent, {
//       duration: 500,
//     });
//   }
// }

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  model= new Login('','',)
  signUpModel = new SignUp('','','','','')
  changePassword = new ChangepasswordModel('','','','')
  selectedTab=0;
  forgotPassword:boolean=false;
  forgotPasswordEmail:String=''

  constructor(private router: Router,private _restService: RestService,private authService: AuthService, private token: TokenStorage, private snackBar: MatSnackBar) {
    if(this.token.getToken()!=null)
    {
      if(this.token.getIsAdmin()=="true"){
        this.router.navigate([ '/admin']);
      }
      else{
         this.router.navigate([ '/mcq']);
      }
    }
   }

  ngOnInit() {
    
  }
  login(){
    console.log(this.model.email)
    
    this.authService.attemptAuth(this.model).subscribe(
       data => {
         // refresh the list
        // this.getFoods();
        console.log("data"+data);
        console.log("email:"+data["isAdmin"])
        if(data["passChange"]==true){
          this.selectedTab=2;
          this.snackBar.open("Please Change you Password",'Dismiss', {
            duration: 5000,
          });
        }
        else{
        this.token.saveToken(data["token"], data["isAdmin"]);
        if(data["isAdmin"]==true)
        {
          this.router.navigate([ '/admin']);
        }
        else
        {
        this.router.navigate([ '/mcq']);
        }
      }
      this.reset();
       },
       error => {
         if(error.status=401)
         {
          this.snackBar.open(error.error['failed'],'Dismiss', {
            duration: 5000,
          });
         }
         console.error(error);
        //  this.router.navigate([{ path: 'mcq', component: McqTestComponent, data: {email:this.model.email} }]);
       }
    );
  
  }

  signup(){
    this._restService.signup(this.signUpModel).subscribe(
      data => {
        // refresh the list
       // this.getFoods();
       console.log(data);
       this.snackBar.open(data['success'],'Dismiss', {
        duration: 5000,
      });
      this.reset();
      this.selectedTab=0;
        return true;
      },
      error => {
        console.log(error);
        if(error.status=='409'){
          this.snackBar.open(error.error['error'],'Dismiss', {
            duration: 5000,
          });
        }
        else{
        console.error(error.data);
        return Observable.throw(error);
        }
      }
   );
  }
  ResetPassword(){
    console.log(this.changePassword.email)
    this._restService.changePassword(this.changePassword).subscribe(
      data => {
        // refresh the list
       // this.getFoods();
       console.log(data);
       this.snackBar.open(data['success'],'Dismiss', {
        duration: 5000,
      });
      this.reset();
      this.selectedTab=0
        return true;
      },
      error => {
        console.log(error);
        if(error.status=='409'|| error.status=='401'){
          this.snackBar.open(error.error['failed'],'Dismiss', {
            duration: 5000,
          });
          console.log(this.changePassword.email)
        }
        else{
        console.error(error.data);
        return Observable.throw(error);
        }
      }
   );
  }
  reset(){
    this.model= new Login('','',)
    this.signUpModel = new SignUp('','','','','')
    this.changePassword = new ChangepasswordModel('','','','')
    this.forgotPasswordEmail=''
  }
  forgetLinkClick(){
    this.forgotPassword=true;
  }
  GeneratePassword(){
    this._restService.forgetPassword(this.forgotPasswordEmail).subscribe(
      data => {
        // refresh the list
       // this.getFoods();
       console.log(data);
       this.snackBar.open(data['success'],'Dismiss', {
        duration: 5000,
      });
      this.forgotPassword=false;
        return true;
      },
      error => {
        console.log(error);
        if(error.status=='409'|| error.status=='401'){
          this.snackBar.open(error.error['failed'],'Dismiss', {
            duration: 5000,
          });
        }
        else{
        console.error(error.data);
        return Observable.throw(error);
        }
      }
   );
  }
       
}
