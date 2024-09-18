import { TestBed } from '@angular/core/testing';

import { RecetteServiceService } from './recette-service.service';

describe('RecetteServiceService', () => {
  let service: RecetteServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RecetteServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
