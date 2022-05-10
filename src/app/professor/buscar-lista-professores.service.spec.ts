import { TestBed } from '@angular/core/testing';

import { BuscarListaProfessoresService } from './buscar-lista-professores.service';

describe('BuscarListaProfessoresService', () => {
  let service: BuscarListaProfessoresService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BuscarListaProfessoresService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
