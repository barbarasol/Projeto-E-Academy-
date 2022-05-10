import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MostrarDisciplinasComponent } from './mostrar-disciplinas.component';

describe('MostrarDisciplinasComponent', () => {
  let component: MostrarDisciplinasComponent;
  let fixture: ComponentFixture<MostrarDisciplinasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MostrarDisciplinasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MostrarDisciplinasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
