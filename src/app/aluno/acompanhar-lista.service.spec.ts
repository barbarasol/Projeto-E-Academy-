import { TestBed } from '@angular/core/testing';

import { AcompanharListaService } from './acompanhar-lista.service';

describe('AcompanharListaService', () => {
  let service: AcompanharListaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AcompanharListaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
