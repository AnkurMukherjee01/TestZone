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
    headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin':'*' })
};

 
@Injectable()
export class RestService {
// baseUrl:string='https://www.completeanalytics.in/api/';
 baseUrl:string='https://www.completeanalytics.in/api/';
    constructor(private http:HttpClient) {}
 
    // Uses http.get() to load data from a single API endpoint
   login(loginDet:Login) {
        return this.http.post('https://www.completeanalytics.in/api/login',JSON.stringify(loginDet),httpOptions);
    }

    signup(signUpDet:SignUp) {
        return this.http.post('https://www.completeanalytics.in/api/signup',JSON.stringify(signUpDet),httpOptions);
    }

    mcq(email:String){
        return this.http.post('https://www.completeanalytics.in/api/mcq',JSON.stringify({"email":email}),httpOptions);
    }

    fetchPendingApproval(){
        return this.http.get('https://www.completeanalytics.in/api/fetchapproval',httpOptions)
    }

    updatependingapproval(approvals:Approval[]){
        return this.http.post('https://www.completeanalytics.in/api/updatependingapproval',JSON.stringify({"approvals":approvals}),httpOptions);
    }

    createBulkLogin(excel:String){
        return this.http.post('https://www.completeanalytics.in/api/bulklogin',JSON.stringify({"excel":excel.split("base64,")[1]}),httpOptions);
    }

    changePassword(password:ChangepasswordModel){
        return this.http.post('https://www.completeanalytics.in/api/changePassword',JSON.stringify(password),httpOptions);
    }

    createTest(createTest:CreateTestModel){
        return this.http.post('https://www.completeanalytics.in/api/createTest',JSON.stringify(createTest),httpOptions);
    }

    getTestName():Observable<any>{
        return this.http.get('https://www.completeanalytics.in/api/getTest',httpOptions);
    }

    getEmployee(type:String){
        return this.http.post('https://www.completeanalytics.in/api/getEmployeeName',JSON.stringify({type:type}),httpOptions);
    }

    assignTest(email:String,test:String){
        return this.http.post('https://www.completeanalytics.in/api/assigntest',JSON.stringify({email:email,test:test}),httpOptions);
    }
    deleteTest(test:String){
        return this.http.post('https://www.completeanalytics.in/api/deletetest',JSON.stringify({test:test}),httpOptions);
    }

    fetchTestDet(testName:String,assignedDate:Date){
        return this.http.post('https://www.completeanalytics.in/api/fetchmcqtest',JSON.stringify({testName:testName,assignedDate:assignedDate}),httpOptions);
    }

    saveTest(testName:String,assignedDate:Date){
        return this.http.post('https://www.completeanalytics.in/api/savemcqtest',JSON.stringify({testName:testName,assignedDate:assignedDate}),httpOptions);
    }

    updateAnswer(answer:Answers,duration:String, testName:String,assignedDate:Date){
        return this.http.post('https://www.completeanalytics.in/api/savemcqanswer',JSON.stringify({answers:answer,duration:duration,testName:testName,assignedDate:assignedDate}),httpOptions);
    }

    assignBulkTest(excel:String){
        return this.http.post('https://www.completeanalytics.in/api/assignbulktest',JSON.stringify({"excel":excel.split("base64,")[1]}),httpOptions);
    }

    getRank(testName:String){
        return this.http.post('https://www.completeanalytics.in/api/getRank',JSON.stringify({testName:testName}),httpOptions);
    }
    getRankBatch(testName:String,batchName:String){
        return this.http.post('https://www.completeanalytics.in/api/getRank',JSON.stringify({testName:testName,batchName:batchName}),httpOptions);
    }

    getBatchList(){
        return this.http.get('https://www.completeanalytics.in/api/getbatchname',httpOptions)
    }

    getUserDetails(batchName:String){
        return this.http.post('https://www.completeanalytics.in/api/getuserdetails',JSON.stringify({batchName:batchName}),httpOptions);
    }

    forgetPassword(email:String){
        return this.http.post('https://www.completeanalytics.in/api/forgetpassword',JSON.stringify({email:email}),httpOptions);
    }

    createBatch(batchName:String){
        console.log(batchName)
        return this.http.post('https://www.completeanalytics.in/api/createbatch',JSON.stringify({batchName:batchName}),httpOptions);
    }
    getTestQuestion(testName:String){
        return this.http.post('https://www.completeanalytics.in/api/gettestquestion',JSON.stringify({testName:testName}),httpOptions);
    }

    updateQuestions(questions:any,testName:String){
        return this.http.post('https://www.completeanalytics.in/api/updatequestion',JSON.stringify({questions:questions,testName:testName}),httpOptions);
    }

    changeBatch(batchName:String,email:String){
        return this.http.post('https://www.completeanalytics.in/api/updatebatchname',JSON.stringify({batchName:batchName,email:email}),httpOptions);
    }

    changeApproval(approval:String,email:String){
        return this.http.post('https://www.completeanalytics.in/api/changeapproval',JSON.stringify({approval:approval,email:email}),httpOptions);
    }

    assignTestBatch(batchName:String,testName:string){
        return this.http.post('https://www.completeanalytics.in/api/assigntestbybatch',JSON.stringify({batchName:batchName,test:testName}),httpOptions);
    }
    updateUserDet(qualification:String,education:string,phNo:string,yearOfExp:string){
        return this.http.post('https://www.completeanalytics.in/api/updateUserDet',JSON.stringify({qualification:qualification,education:education,phno:phNo,exp:yearOfExp}),httpOptions);
    }

    getStudentReport(loginDate:Date,minExp:string,maxExp:string,testName:string,marks:string){
        return this.http.post('https://www.completeanalytics.in/api/getuserreport',JSON.stringify({date:loginDate,minexp:minExp,maxexp:maxExp,testName:testName,marks:marks}),httpOptions);
    }

    getEnquiry(date){
        return this.http.post('https://www.completeanalytics.in/api/getenquiry',JSON.stringify({time:date}),httpOptions);
    }
}

