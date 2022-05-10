import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlunoCadastroComponent } from './aluno-cadastro.component';

describe('AlunoCadastroComponent', () => {
  let component: AlunoCadastroComponent;
  let fixture: ComponentFixture<AlunoCadastroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlunoCadastroComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AlunoCadastroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
