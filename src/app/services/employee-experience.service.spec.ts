import { TestBed } from '@angular/core/testing';

import { EmployeeExperienceService } from './employee-experience.service';

describe('EmployeeExperienceService', () => {
  let service: EmployeeExperienceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmployeeExperienceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
