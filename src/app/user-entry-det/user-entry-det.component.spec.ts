import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserEntryDetComponent } from './user-entry-det.component';

describe('UserEntryDetComponent', () => {
  let component: UserEntryDetComponent;
  let fixture: ComponentFixture<UserEntryDetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserEntryDetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserEntryDetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
