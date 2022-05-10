import { TestBed } from '@angular/core/testing';

import { GuardaUsuariosCadastradosParaLoginService } from './guarda-usuarios-cadastrados-para-login.service';

describe('GuardaUsuariosCadastradosParaLoginService', () => {
  let service: GuardaUsuariosCadastradosParaLoginService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GuardaUsuariosCadastradosParaLoginService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
