import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Emprestimo } from './emprestimo';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmprestimoService {

  constructor(private httpClient: HttpClient) { }

  httpOptions = {

    headers: new HttpHeaders({
      'Content-Type': 'application/json; charset=UTF-8',
    })
  
  }

  public cadastrarEmprestimo(emprestimo: Emprestimo): Observable<any>{

    return this.httpClient.post<any>("http://localhost:3000/v1/emprestimo",
      JSON.stringify({
        matricula: emprestimo.matricula,
        dataDevolucao: emprestimo.dataDevolucao,
        valorTotal:emprestimo.valorTotal,
        itensEmprestimo: emprestimo.itensEmprestimo,
      }),
      this.httpOptions
    )

  }

}
