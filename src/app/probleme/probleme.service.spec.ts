import { TestBed, inject } from '@angular/core/testing';

import { ProblemeService } from './probleme.service';

describe('ProblemeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProblemeService]
    });
  });

  it('should be created', inject([ProblemeService], (service: ProblemeService) => {
    expect(service).toBeTruthy();
  }));
});
