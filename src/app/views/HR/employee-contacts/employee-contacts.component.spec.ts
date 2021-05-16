import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeContactsComponent } from './employee-contacts.component';

describe('EmployeeContactsComponent', () => {
  let component: EmployeeContactsComponent;
  let fixture: ComponentFixture<EmployeeContactsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeeContactsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeContactsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
