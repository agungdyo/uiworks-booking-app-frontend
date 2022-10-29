import { TestBed } from '@angular/core/testing';

import { MajaService } from './maja.service';

describe('MajaService', () => {
  let service: MajaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MajaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
