import { TestBed } from '@angular/core/testing';

import { EmployeeContactService } from './employee-contact.service';

describe('EmployeeContactService', () => {
  let service: EmployeeContactService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmployeeContactService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
