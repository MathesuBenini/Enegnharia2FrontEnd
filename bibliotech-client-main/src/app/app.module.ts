import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormAlunoComponent } from './form-aluno/form-aluno.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ListAlunosComponent } from './list-alunos/list-alunos.component';
import { ErrorModalComponent } from './error-modal/error-modal.component';
import { FormLivroComponent } from './form-livro/form-livro.component';
import { ListLivrosComponent } from './list-livros/list-livros.component';
import { MenuComponent } from './menu/menu.component';
import { FormEmprestimoComponent } from './form-emprestimo/form-emprestimo.component';
import { ListEmprestimosComponent } from './list-emprestimos/list-emprestimos.component';
import { DataEmprestimoComponent } from './data-emprestimo/data-emprestimo.component';
import { DataAlunoComponent } from './data-aluno/data-aluno.component';

@NgModule({
  declarations: [
    AppComponent,
    FormAlunoComponent,
    ListAlunosComponent,
    ErrorModalComponent,
    FormLivroComponent,
    ListLivrosComponent,
    MenuComponent,
    FormEmprestimoComponent,
    ListEmprestimosComponent,
    DataEmprestimoComponent,
    DataAlunoComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    CommonModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
