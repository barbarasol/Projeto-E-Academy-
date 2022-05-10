import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserProfessorComponent } from './user-professor.component';

describe('UserProfessorComponent', () => {
  let component: UserProfessorComponent;
  let fixture: ComponentFixture<UserProfessorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserProfessorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserProfessorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
