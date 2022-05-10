import { RouterModule, Routes } from "@angular/router";
import { NgModule } from '@angular/core';

import { MostrarDisciplinasComponent } from './mostrar-disciplinas/mostrar-disciplinas.component';
import { UserAlunoComponent } from './user-aluno.component';
import { MostrarFaltasComponent } from './mostrar-faltas/mostrar-faltas.component';
import { HomeComponent } from '../home/home.component';
import { MostrarNotasComponent } from './mostrar-notas/mostrar-notas.component';

const userAlunoRoutes: Routes = [
  { path: '', component: UserAlunoComponent, children: [
    { path: '', component: HomeComponent},
    { path: 'mostrar-disciplinas', component: MostrarDisciplinasComponent },
    { path: 'mostrar-faltas', component: MostrarFaltasComponent },
    { path: 'mostrar-notas', component: MostrarNotasComponent }
  ]}
]

@NgModule({
  imports: [RouterModule.forChild(userAlunoRoutes)],
  exports: [RouterModule]
})
export class UserAlunoRoutingModule{}
