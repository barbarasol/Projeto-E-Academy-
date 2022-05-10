import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';

import { ListaProfessoresComponent } from './lista-professores/lista-professores.component';
import { ProfessorCadastroComponent } from './professor-cadastro/professor-cadastro.component';
import { ProfessorComponent } from './professor.component';

const professorRoutes : Routes = [
  { path: '', component: ProfessorComponent, children: [
    { path: 'cadastro', component: ProfessorCadastroComponent},
    { path: 'lista', component: ListaProfessoresComponent}
  ]}
]

@NgModule({
  imports: [RouterModule.forChild(professorRoutes)],
  exports: [RouterModule]
})
export class ProfessorRoutingModule {}
