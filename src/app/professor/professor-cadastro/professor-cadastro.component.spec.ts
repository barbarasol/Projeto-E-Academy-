import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfessorCadastroComponent } from './professor-cadastro.component';

describe('ProfessorCadastroComponent', () => {
  let component: ProfessorCadastroComponent;
  let fixture: ComponentFixture<ProfessorCadastroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfessorCadastroComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfessorCadastroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
