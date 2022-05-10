import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LancarFaltasComponent } from './lancar-faltas.component';

describe('LancarFaltasComponent', () => {
  let component: LancarFaltasComponent;
  let fixture: ComponentFixture<LancarFaltasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LancarFaltasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LancarFaltasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
