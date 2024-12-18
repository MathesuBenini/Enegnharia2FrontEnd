import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GetAlunoService {

   
  constructor(private httpClient: HttpClient) { }

  httpOptions = {

    headers: new HttpHeaders({
      'Content-Type': 'application/json; charset=UTF-8',
    })
  
  }

  public getAluno(matricula: number): Observable<any>{

    return this.httpClient.get<any>("http://localhost:3000/v1/aluno/"+matricula)

  }

  public criarDebitoAluno(matricula:number, valor:number){
    let a = this.httpClient.post<any>("http://localhost:3000/v1/debito",
    JSON.stringify({
      matricula: matricula,
      valor: valor
    }),
    this.httpOptions
   )
  
   return a
  }

  
}
