import { Component, OnInit } from '@angular/core';
import { ListAlunosService } from './list-alunos.service';
import { Router } from '@angular/router';
import { Aluno } from '../form-aluno/aluno';
import { catchError, throwError } from 'rxjs';

@Component({
  selector: 'app-list-alunos',
  templateUrl: './list-alunos.component.html',
  styleUrls: ['./list-alunos.component.css']
})
export class ListAlunosComponent implements OnInit {
  
  constructor(
    private listAlunosService: ListAlunosService,
    private router: Router
  ){}

  public listaAlunos: Aluno[] | undefined | any
  
  ngOnInit(): void {
    console.log("aaa")
    this.listAlunosService.listarAlunos()
    .pipe(catchError(err => {
     console.log(err)
      return throwError(() => new Error(err));
    }))
    .subscribe(res => {
      this.listaAlunos = res
      console.log("res")
    })

  }

  
  public goToMenu(){
    this.router.navigate(['menu'])
  }

  public goToAluno(matricula:number){
    this.router.navigate(['aluno/'+matricula])
  }

}
