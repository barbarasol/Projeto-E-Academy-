import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { AlunoComponent } from './aluno.component';
import { AlunoCadastroComponent } from './aluno-cadastro/aluno-cadastro.component';
import { AlunoRoutingModule } from './aluno.routing.module';
import { ListaAlunosComponent } from './lista-alunos/lista-alunos.component';
import { AcompanharListaService } from './acompanhar-lista.service';

@NgModule({
  declarations: [
    AlunoComponent,
    AlunoCadastroComponent,
    ListaAlunosComponent],

  imports: [
    CommonModule,
    AlunoRoutingModule,
    ReactiveFormsModule
  ],
  providers: [AcompanharListaService]
})
export class AlunoModule { }
