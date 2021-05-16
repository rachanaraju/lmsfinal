import { TestBed } from '@angular/core/testing';

import { EmployeePerformanceService } from './employee-performance.service';

describe('EmployeePerformanceService', () => {
  let service: EmployeePerformanceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmployeePerformanceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
