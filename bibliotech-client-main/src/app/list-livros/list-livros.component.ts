import { Component, OnInit } from '@angular/core';
import { ListLivrosService } from './list-livros.service';
import { Router } from '@angular/router';
import { Livro } from '../form-livro/livro';
import { catchError, throwError } from 'rxjs';

@Component({
  selector: 'app-list-livros',
  templateUrl: './list-livros.component.html',
  styleUrls: ['./list-livros.component.css']
})
export class ListLivrosComponent implements OnInit {

  constructor(
    private listLivrosService: ListLivrosService,
    private router: Router
  ){}

  public listaLivros: Livro[] | undefined | any

  ngOnInit(): void {
    
    this.listLivrosService.listarLivros()
    .pipe(catchError(err => {
     
      return throwError(() => new Error(err));
    }))
    .subscribe(res => {
      this.listaLivros = res
    })


  }

  public goToMenu(){
    this.router.navigate(['menu'])
  }

}
