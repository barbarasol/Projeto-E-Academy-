import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { DisciplinaComponent } from "./disciplina/disciplina.component";
import { HomeComponent } from "../home/home.component";
import { UserAdminComponent } from "./user-admin.component";

const userAdminRoutes: Routes = [
  { path: '', component: UserAdminComponent, children: [
    { path: '', component: HomeComponent},
    { path: 'professor', loadChildren: () => import('../professor/professor.module').then(mod => mod.ProfessorModule)},
    { path: 'disciplina', component: DisciplinaComponent},
    { path: 'aluno', loadChildren: () => import('../aluno/aluno.module').then(mod => mod.AlunoModule) }
  ]}
]

@NgModule({
  imports: [RouterModule.forChild(userAdminRoutes)],
  exports: [RouterModule]
})
export class UserAdminRoutingModule{}
