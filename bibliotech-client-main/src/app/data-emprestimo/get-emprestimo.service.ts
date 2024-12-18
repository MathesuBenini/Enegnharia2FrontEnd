import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GetEmprestimoService {

  
  constructor(private httpClient: HttpClient) { }

  httpOptions = {

    headers: new HttpHeaders({
      'Content-Type': 'application/json; charset=UTF-8',
    })
  
  }

  
  public getEmprestimo(idEmprestimo:number): Observable<any>{

    let a = this.httpClient.get<any>("http://localhost:3000/v1/emprestimo/"+idEmprestimo,
     this.httpOptions
    )
   
    return a

  }

  public deleteEmprestimo(idEmprestimo:number): Observable<any>{

    let a = this.httpClient.delete<any>("http://localhost:3000/v1/emprestimo/"+idEmprestimo,
     this.httpOptions
    )
   
    return a

  }

  public deleteDevolucao(idDevolucao:number): Observable<any>{

    let a = this.httpClient.delete<any>("http://localhost:3000/v1/devolucao/"+idDevolucao,
     this.httpOptions
    )
   
    return a

  }


  
}
