import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AlunoCadastroComponent } from './aluno-cadastro/aluno-cadastro.component';
import { AlunoComponent } from './aluno.component';
import { ListaAlunosComponent } from './lista-alunos/lista-alunos.component';

const alunoRoutes: Routes = [
  {path: '', component: AlunoComponent, children: [
    { path: 'cadastro', component: AlunoCadastroComponent},
    { path: 'lista', component: ListaAlunosComponent }
  ]}
]

@NgModule({
  imports: [RouterModule.forChild(alunoRoutes)],
  exports: [RouterModule]
})
export class AlunoRoutingModule { }

