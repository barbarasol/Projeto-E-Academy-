import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserAlunoComponent } from './user-aluno.component';

describe('UserAlunoComponent', () => {
  let component: UserAlunoComponent;
  let fixture: ComponentFixture<UserAlunoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserAlunoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserAlunoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
