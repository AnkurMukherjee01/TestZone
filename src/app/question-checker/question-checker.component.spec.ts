import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionCheckerComponent } from './question-checker.component';

describe('QuestionCheckerComponent', () => {
  let component: QuestionCheckerComponent;
  let fixture: ComponentFixture<QuestionCheckerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuestionCheckerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionCheckerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
