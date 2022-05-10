import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MostrarFaltasComponent } from './mostrar-faltas.component';

describe('MostrarFaltasComponent', () => {
  let component: MostrarFaltasComponent;
  let fixture: ComponentFixture<MostrarFaltasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MostrarFaltasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MostrarFaltasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
