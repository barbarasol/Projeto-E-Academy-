import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";

import { UserProfessorComponent } from './user-professor.component';
import { SelecionarDisciplinasComponent } from './selecionar-disciplinas/selecionar-disciplinas.component';
import { TurmasComponent } from './turmas/turmas.component';
import { LancarFaltasComponent } from './lancar-faltas/lancar-faltas.component';
import { LancarNotasComponent } from './lancar-notas/lancar-notas.component';
import { HomeComponent } from '../home/home.component';

const userProfessorRoutes: Routes = [
  { path: '', component: UserProfessorComponent, children: [
    { path: '', component: HomeComponent},
    { path: 'selecionar-disciplinas', component: SelecionarDisciplinasComponent },
    { path: 'turmas', component: TurmasComponent },
    { path: 'lancar-faltas', component: LancarFaltasComponent },
    { path: 'lancar-notas', component: LancarNotasComponent }
  ] }
]

@NgModule({
  imports: [RouterModule.forChild(userProfessorRoutes)],
  exports: [RouterModule]
})
export class UserProfessorRoutingModule{}
