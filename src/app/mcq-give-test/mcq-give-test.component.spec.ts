import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { McqGiveTestComponent } from './mcq-give-test.component';

describe('McqGiveTestComponent', () => {
  let component: McqGiveTestComponent;
  let fixture: ComponentFixture<McqGiveTestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ McqGiveTestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(McqGiveTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
