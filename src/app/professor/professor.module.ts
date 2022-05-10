import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { ListaProfessoresComponent } from './lista-professores/lista-professores.component';
import { ProfessorComponent } from './professor.component';
import { ProfessorCadastroComponent } from './professor-cadastro/professor-cadastro.component';
import { ProfessorRoutingModule } from './professor.routing.module';

@NgModule({
  declarations: [
    ProfessorComponent,
    ProfessorCadastroComponent,
    ListaProfessoresComponent
  ],
  imports: [
    CommonModule,
    ProfessorRoutingModule,
    ReactiveFormsModule
  ],
  providers: []
})
export class ProfessorModule { }
