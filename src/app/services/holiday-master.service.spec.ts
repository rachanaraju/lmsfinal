import { TestBed } from '@angular/core/testing';

import { HolidayMasterService } from './holiday-master.service';

describe('HolidayMasterService', () => {
  let service: HolidayMasterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HolidayMasterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
