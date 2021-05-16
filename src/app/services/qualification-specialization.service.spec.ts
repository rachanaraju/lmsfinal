import { TestBed } from '@angular/core/testing';

import { QualificationSpecializationService } from './qualification-specialization.service';

describe('QualificationSpecializationService', () => {
  let service: QualificationSpecializationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QualificationSpecializationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
