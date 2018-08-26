import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-mcq-test-question',
  templateUrl: './mcq-test-question.component.html',
  styleUrls: ['./mcq-test-question.component.css']
})
export class McqTestQuestionComponent implements OnInit {

  @Input() question: any;
  @Input() testName:String;
  answer:String;

  constructor() { }

  ngOnInit() {
  }

}
