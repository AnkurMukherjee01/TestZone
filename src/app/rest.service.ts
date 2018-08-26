import {Injectable} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable} from 'rxjs';
import { Login } from './login';
import { SignUp } from "./signup";
import { Approval } from "./approval";
import { ChangepasswordModel } from "./changepassword-model";
import { CreateTestModel} from "./create-test-model";
import {Answers} from './answers';
 
const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
 
@Injectable()
export class RestService {
 
    constructor(private http:HttpClient) {}
 
    // Uses http.get() to load data from a single API endpoint
   login(loginDet:Login) {
        return this.http.post('http://139.59.74.138/api/login',JSON.stringify(loginDet),httpOptions);
    }

    signup(signUpDet:SignUp) {
        console.log(JSON.stringify(signUpDet));
        return this.http.post('http://139.59.74.138/api/signup',JSON.stringify(signUpDet),httpOptions);
    }

    mcq(email:String){
        console.log(JSON.stringify({"email":email}));
        return this.http.post('http://139.59.74.138/api/mcq',JSON.stringify({"email":email}),httpOptions);
    }

    fetchPendingApproval(){
        return this.http.get('http://139.59.74.138/api/fetchapproval',httpOptions)
    }

    updatependingapproval(approvals:Approval[]){
        console.log(JSON.stringify({"approvals":approvals}));
        return this.http.post('http://139.59.74.138/api/updatependingapproval',JSON.stringify({"approvals":approvals}),httpOptions);
    }

    createBulkLogin(excel:String){
        console.log(JSON.stringify({"excel":excel.split("base64,")[1]}));
        return this.http.post('http://139.59.74.138/api/bulklogin',JSON.stringify({"excel":excel.split("base64,")[1]}),httpOptions);
    }

    changePassword(password:ChangepasswordModel){
        console.log(JSON.stringify(password));
        return this.http.post('http://139.59.74.138/api/changePassword',JSON.stringify(password),httpOptions);
    }

    createTest(createTest:CreateTestModel){
        console.log(JSON.stringify(createTest));
        return this.http.post('http://139.59.74.138/api/createTest',JSON.stringify(createTest),httpOptions);
    }

    getTestName():Observable<any>{
        return this.http.get('http://139.59.74.138/api/getTest',httpOptions);
    }

    getEmployee(type:String){
        return this.http.post('http://139.59.74.138/api/getEmployeeName',JSON.stringify({type:type}),httpOptions);
    }

    assignTest(email:String,test:String){
        console.log(JSON.stringify({email:email,test:test}));
        return this.http.post('http://139.59.74.138/api/assigntest',JSON.stringify({email:email,test:test}),httpOptions);
    }
    deleteTest(test:String){
        console.log(JSON.stringify({test:test}));
        return this.http.post('http://139.59.74.138/api/deletetest',JSON.stringify({test:test}),httpOptions);
    }

    fetchTestDet(testName:String){
        console.log(JSON.stringify({test:testName}));
        return this.http.post('http://139.59.74.138/api/fetchmcqtest',JSON.stringify({testName:testName}),httpOptions);
    }

    saveTest(testName:String,assignedDate:Date){
        console.log(JSON.stringify({testName:testName,assignedDate:assignedDate}));
        return this.http.post('http://139.59.74.138/api/savemcqtest',JSON.stringify({testName:testName,assignedDate:assignedDate}),httpOptions);
    }

    updateAnswer(answer:Answers,duration:String, testName:String,assignedDate:Date){
        console.log(JSON.stringify({answers:answer,duration:duration,testName:testName,assignedDate:assignedDate}));
        return this.http.post('http://139.59.74.138/api/savemcqanswer',JSON.stringify({answers:answer,duration:duration,testName:testName,assignedDate:assignedDate}),httpOptions);
    }

    assignBulkTest(excel:String){
        console.log(JSON.stringify({"excel":excel.split("base64,")[1]}));
        return this.http.post('http://139.59.74.138/api/assignbulktest',JSON.stringify({"excel":excel.split("base64,")[1]}),httpOptions);
    }

    getRank(testName:String){
        console.log(JSON.stringify({testName:testName}));
        return this.http.post('http://139.59.74.138/api/getRank',JSON.stringify({testName:testName}),httpOptions);
    }

    getBatchList(){
        return this.http.get('http://139.59.74.138/api/getbatchname',httpOptions)
    }

    getUserDetails(batchName:String){
        console.log(JSON.stringify({batchName:batchName}));
        return this.http.post('http://139.59.74.138/api/getuserdetails',JSON.stringify({batchName:batchName}),httpOptions);
    }
}
