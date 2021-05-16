import { TestBed } from '@angular/core/testing';

import { EmployeeQualificationService } from './employee-qualification.service';

describe('EmployeeQualificationService', () => {
  let service: EmployeeQualificationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmployeeQualificationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
