import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-question-checker',
  templateUrl: './question-checker.component.html',
  styleUrls: ['./question-checker.component.css']
})
export class QuestionCheckerComponent implements OnInit {
@Input() type:String;
@Input() questionNumber:String
@Output() clickQuestion= new EventEmitter()

  constructor() { }

  ngOnInit() {
  }

}
