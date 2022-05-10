import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserAlunoRoutingModule } from './user-aluno.routing.module';
import { UserAlunoComponent } from './user-aluno.component';
import { MostrarDisciplinasComponent } from './mostrar-disciplinas/mostrar-disciplinas.component';
import { MostrarFaltasComponent } from './mostrar-faltas/mostrar-faltas.component';
import { MostrarNotasComponent } from './mostrar-notas/mostrar-notas.component';

@NgModule({
  declarations: [
    UserAlunoComponent,
    MostrarDisciplinasComponent,
    MostrarFaltasComponent,
    MostrarNotasComponent
  ],
  imports: [
    CommonModule,
    UserAlunoRoutingModule,
    ReactiveFormsModule
  ]
})
export class UserAlunoModule { }
