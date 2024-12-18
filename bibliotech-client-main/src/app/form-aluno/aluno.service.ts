import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Aluno } from './aluno';

@Injectable({
  providedIn: 'root'
})
export class AlunoService {

  constructor(private httpClient: HttpClient) { }

  httpOptions = {

    headers: new HttpHeaders({
      'Content-Type': 'application/json; charset=UTF-8',
    })
  
  }

  
  public cadastrarAluno(aluno: Aluno): Observable<any>{

    return this.httpClient.post<any>("http://localhost:3000/v1/aluno",
     JSON.stringify({nome:aluno.nome, cpf: aluno.cpf, endereco: aluno.endereco}),
     this.httpOptions
    )

  }

  
}
