import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Livro } from './livro';

@Injectable({
  providedIn: 'root'
})
export class LivroService {

  constructor(private httpClient: HttpClient) { }

  httpOptions = {

    headers: new HttpHeaders({
      'Content-Type': 'application/json; charset=UTF-8',
    })
  
  }

  
  public cadastrarLivro(livro: Livro): Observable<any>{

    return this.httpClient.post<any>("http://localhost:3000/v1/livro",
     JSON.stringify({
      dataPrevista:livro.dataPrevista,
      ano: livro.ano,
      isbn: livro.isbn,
      edicao: livro.edicao,
      prazo: livro.prazo,
      nome: livro.nome,
      areaId: livro.areaId,
      nomeAutor: livro.nomeAutor
    }),
     this.httpOptions
    )

  }

  
}
