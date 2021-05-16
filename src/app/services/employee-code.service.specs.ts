import { TestBed } from '@angular/core/testing';

import { EmployeeCodeService } from './employee-code.service';

describe('EmployeeCodeService', () => {
  let service: EmployeeCodeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmployeeCodeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
