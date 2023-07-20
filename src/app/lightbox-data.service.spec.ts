import { TestBed } from '@angular/core/testing';

import { LightboxDataService } from './lightbox-data.service';

describe('LightboxDataService', () => {
  let service: LightboxDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LightboxDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
