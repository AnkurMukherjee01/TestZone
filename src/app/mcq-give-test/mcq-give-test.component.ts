import { Component, OnInit, Pipe, PipeTransform, HostListener, Renderer2 } from '@angular/core';
import { RestService } from "../rest.service";
import { timer, Subject, Observable } from 'rxjs';
import { LoginComponent } from "../login/login.component";
import { MCQ } from '../mcq';
import { Router, ActivatedRoute, Params, } from '@angular/router';
import { Answers } from '../answers';
import * as screenfull from 'screenfull';
import { McqTestComponent } from '../mcq-test/mcq-test.component';

@Pipe({
  name: 'minuteSeconds'
})
export class MinuteSecondsPipe implements PipeTransform {

  transform(value: number): string {
    const minutes: number = Math.floor(value / 60);
    return minutes + ':' + (value - minutes * 60);
  }

}

@Component({
  selector: 'app-mcq-give-test',
  templateUrl: './mcq-give-test.component.html',
  styleUrls: ['./mcq-give-test.component.css']
})
export class McqGiveTestComponent implements OnInit {

  test: any = {};
  counter: number = -1;
  currentQuestion: any = '';
  timeleft: any = 0;
  answers: Answers[] = [];
  currentAnswer: Answers = new Answers('','', '', 'NA','');
  marks: number;
  totalMarks: Number;
  comments: String[] = [];
  answeredTest: number = 0;
  //testUnAuthorized:Boolean=false;


  globalListenFunc: Function;

  @HostListener('window:keyup', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    console.log(event);
    event.preventDefault();
    event.stopPropagation();
    let keyPressed = event.keyCode;
    if (keyPressed === 27) {
      console.log('Escape!');
    }
  }


  constructor(private router: Router, private _restService: RestService, private route: ActivatedRoute, private renderer: Renderer2) {
    this.counter = 0;
    this.marks = -1;
    this.totalMarks = -1;
  }
  ngOnDestroy() {
    // remove listener
    this.globalListenFunc();
  }
  ngOnInit() {
    this.globalListenFunc = this.renderer.listen('document', 'keypress', e => {
      console.log(e);
      e.preventDefault();
      e.stopPropagation();
    });
    if (screenfull.enabled) {
      screenfull.toggle();
    }
    screenfull.on('window:keyup', function (e) {
      e.stopPropagation();
    })
    let elem = document.getElementById('fullscreen');;
    let methodToBeInvoked = elem.requestFullscreen ||
      elem.webkitRequestFullScreen || elem['mozRequestFullscreen']
      ||
      elem['msRequestFullscreen'];
    if (methodToBeInvoked) methodToBeInvoked.call(elem);
    //   var element= document.getElementById("fullscreen");
    //   if (element.requestFullscreen) {
    //     element.requestFullscreen();
    // } else if (element['mozRequestFullscreen'] ) {
    //     element.requestFullscreen();
    // } else if (element.webkitRequestFullScreen) {
    //     element.webkitRequestFullScreen();
    // }
    const sourceTwo = timer(1000, 1000);
    var dateNow=(new Date()).getTime()
    this._restService.fetchTestDet(this.route.snapshot.paramMap.get('testName'), new Date(this.route.snapshot.paramMap.get('assignedDate'))).subscribe(
      data => {
        this.test = data["tst"][0];
        console.log(data);
        sourceTwo.subscribe(o => {
          if (data["existingDet"][0].timeStarted != undefined) {
            this.timeleft = data["tst"][0]["testDuration"] * 60-Math.floor((dateNow - new Date(data["existingDet"][0].timeStarted).getTime()) / 1000) - o
          }
          else {
            this.timeleft = (data["tst"][0]["testDuration"] * 60 - o);
          }
          if (this.timeleft == 0.0) {
            this.submit();
            
          }
        });
        if (data["existingDet"][0].timeStarted != undefined) {
          this.currentQuestion= data["tst"][0]["tests"][this.counter];
         // this.currentAnswer.answer = data["existingDet"][0]["answers"].filter(p => p["question"] == data["tst"][0]["tests"][0].question)[0]["answer"]
          for (var i = 0; i < data["tst"][0]["tests"].length; i++) {
            if (data["existingDet"][0]["answers"].filter(p =>p["qstnId"] == data["tst"][0]["tests"][i]._id).length > 0) {
              console.log(data["existingDet"][0]["answers"].filter(p => p["qstnId"] == data["tst"][0]["tests"][i]._id)[0]["answer"])
              this.answers.push(new Answers(data["tst"][0]["tests"][i].question,data["tst"][0]["tests"][i].image, data["existingDet"][0]["answers"].filter(p => p["qstnId"] == data["tst"][0]["tests"][i]._id)[0]["answer"], "A",data["tst"][0]["tests"][i]._id));
            //  if(i=0){
            //    this.currentAnswer.answer=data["existingDet"][0]["answers"].filter(p => p["question"] == data["tst"][0]["tests"][i].question)[0]["answer"]
            //  } 
            }
            else {
              this.answers.push(new Answers(data["tst"][0]["tests"][i].question,data["tst"][0]["tests"][i].image, "", "NA",data["tst"][0]["tests"][i]._id));
            }


          }
          
          this.answeredTest = this.answers.filter(o => o.answer != "").length;
        }
        else {
          this.currentQuestion = data["tst"][0]["tests"][this.counter];
          for (var i = 0; i < data["tst"][0]["tests"].length; i++) {
            this.answers.push(new Answers(data["tst"][0]["tests"][i].question,data["tst"][0]["tests"][i].image, "", "NA",data["tst"][0]["tests"][i]._id));
          }
        }
//this.comments=data["tst"][0]["tests"].map(o=>o["comments"])
        //  this.dataSource.data =data['testDet'];
        //   return true;
        // this.timeleft=data["tst"][0]["testDuration"]*60000- 

      },
      error => {
        console.error(error.data);
        if (error.status == 409) {
          screenfull.exit();
          this.router.navigate(['/mcq']);
        }
        else
          this.router.navigate([{ path: '', component: LoginComponent }]);
      }
    );
  }

  next() {

    this.counter++;

    this.currentQuestion = this.test["tests"][this.counter];
    this.currentAnswer.answer = this.answers[this.counter].answer;
    console.log(this.answers);


    console.log(this.answers.filter(o => o.answer != ""));

  }
  previous() {
    this.counter--;
    this.currentQuestion = this.test["tests"][this.counter];
    this.currentAnswer.answer = this.answers[this.counter].answer;
    console.log(this.answers)
  }
  clickQuestion(index) {
    this.currentQuestion = this.test["tests"][index];
    this.currentAnswer.answer = this.answers[index].answer;
    this.counter = index;
    console.log(this.answers)
  }
  bookmark() {
    this.answers[this.counter].answerState = 'B';
    console.log(this.answers)
  }
  unmark() {
    if (this.answers[this.counter].answer.length > 0)
      this.answers[this.counter].answerState = 'A';
    else
      this.answers[this.counter].answerState = 'NA';
    console.log(this.answers)
  }
  onSelectionChange(option) {
    // this.currentAnswer.answer=option;
    this.currentAnswer.question = this.currentQuestion.question;
    this.answers[this.counter].answer = option;
    this._restService.updateAnswer({ question: this.currentQuestion.question,image:"", answer: option, answerState: '',qstnId:this.currentQuestion }, this.timeleft, this.route.snapshot.paramMap.get('testName'), new Date(this.route.snapshot.paramMap.get('assignedDate'))).subscribe(
      data => {
        console.log(data);
        this.answers[this.counter].answerState = 'A';
        this.answeredTest = this.answers.filter(o => o.answer != "").length;
        // z
      },
      error => {
        console.error(error.data);
        this.router.navigate([{ path: '', component: LoginComponent }]);
      }
    );
  }

  submit() {
    this._restService.saveTest(this.route.snapshot.paramMap.get('testName'), new Date(this.route.snapshot.paramMap.get('assignedDate'))).subscribe(
      data => {
        console.log(data);
        this.marks = data['marks'];
        this.totalMarks = data['totalMarks'];
        console.log(this.test["tests"])
        this.comments = this.test["tests"].filter(p=>data['correctQstnId'].indexOf(p._id)<0).map(o=>o.comments)
        console.log(this.comments)
        // z
      },
      error => {
        console.error(error.data);
        this.router.navigate([{ path: '', component: LoginComponent }]);
      }
    );
  }

  ok() {
    screenfull.exit();
    this.router.navigate(['/mcq']);
  }


}
