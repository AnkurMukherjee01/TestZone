import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { McqTestQuestionComponent } from './mcq-test-question.component';

describe('McqTestQuestionComponent', () => {
  let component: McqTestQuestionComponent;
  let fixture: ComponentFixture<McqTestQuestionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ McqTestQuestionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(McqTestQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
