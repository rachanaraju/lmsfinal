import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QualificationTypeComponent } from './qualification-type.component';

describe('QualificationTypeComponent', () => {
  let component: QualificationTypeComponent;
  let fixture: ComponentFixture<QualificationTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QualificationTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QualificationTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
