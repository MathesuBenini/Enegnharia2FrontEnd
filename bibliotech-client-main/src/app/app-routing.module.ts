import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormAlunoComponent } from './form-aluno/form-aluno.component';
import { ListAlunosComponent } from './list-alunos/list-alunos.component';
import { FormLivroComponent } from './form-livro/form-livro.component';
import { ListLivrosComponent } from './list-livros/list-livros.component';
import { MenuComponent } from './menu/menu.component';
import { FormEmprestimoComponent } from './form-emprestimo/form-emprestimo.component';
import { ListEmprestimosComponent } from './list-emprestimos/list-emprestimos.component';
import { DataEmprestimoComponent } from './data-emprestimo/data-emprestimo.component';
import { DataAlunoComponent } from './data-aluno/data-aluno.component';

const routes: Routes = [
  {path:'menu', component: MenuComponent},
  {path:'alunos/cadastro', component: FormAlunoComponent},
  {path:'alunos', component: ListAlunosComponent},
  {path:'livros/cadastro', component: FormLivroComponent},
  {path:'livros', component: ListLivrosComponent},
  {path:'emprestimo/cadastro', component: FormEmprestimoComponent},
  {path:'emprestimos', component: ListEmprestimosComponent},
  {path:'emprestimo/:idEmprestimo', component: DataEmprestimoComponent},
  {path:'aluno/:matricula', component: DataAlunoComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
