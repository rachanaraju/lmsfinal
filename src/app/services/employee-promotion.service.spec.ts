import { TestBed } from '@angular/core/testing';

import { EmployeePromotionService } from './employee-promotion.service';

describe('EmployeePromotionService', () => {
  let service: EmployeePromotionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmployeePromotionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
