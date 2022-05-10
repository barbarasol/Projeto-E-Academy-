import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { CadastroLoginComponent } from './login/cadastro-login/cadastro-login.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'login/cadastroLogin', component: CadastroLoginComponent},
  { path: 'userAdmin', loadChildren: () => import('./user-admin/user-admin.module').then(mod => mod.UserAdminModule) },
  { path: 'userProfessor', loadChildren: () => import('./user-professor/user-professor.module').then(mod => mod.UserProfessorModule) },
  { path: 'userAluno', loadChildren: () => import('./user-aluno/user-aluno.module').then(mod => mod.UserAlunoModule) },
  { path: '', redirectTo: '/login', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
