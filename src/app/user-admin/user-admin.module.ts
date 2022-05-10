import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DisciplinaComponent } from './disciplina/disciplina.component';
import { UserAdminRoutingModule } from './user-admin.routing.module';
import { UserAdminComponent } from './user-admin.component';

@NgModule({
  declarations: [
    UserAdminComponent,
    DisciplinaComponent
  ],
  imports: [
    CommonModule,
    UserAdminRoutingModule,
    ReactiveFormsModule
  ]
})
export class UserAdminModule { }
