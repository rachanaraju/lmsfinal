import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QualificationSpecializationComponent } from './qualification-specialization.component';

describe('QualificationSpecializationComponent', () => {
  let component: QualificationSpecializationComponent;
  let fixture: ComponentFixture<QualificationSpecializationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QualificationSpecializationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QualificationSpecializationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
