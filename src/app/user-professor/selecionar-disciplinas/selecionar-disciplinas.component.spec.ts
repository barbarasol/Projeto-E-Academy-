import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelecionarDisciplinasComponent } from './selecionar-disciplinas.component';

describe('SelecionarDisciplinasComponent', () => {
  let component: SelecionarDisciplinasComponent;
  let fixture: ComponentFixture<SelecionarDisciplinasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelecionarDisciplinasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelecionarDisciplinasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
