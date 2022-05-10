import { BuscarDisciplinasService } from './buscar-disciplinas.service';
import { TestBed } from '@angular/core/testing';

describe('BuscarDisciplinasService', () => {
  let service: BuscarDisciplinasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BuscarDisciplinasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
