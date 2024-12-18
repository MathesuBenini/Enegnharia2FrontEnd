import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ListAlunosService {

  constructor(private httpClient: HttpClient) { }

  httpOptions = {

    headers: new HttpHeaders({
      'Content-Type': 'application/json; charset=UTF-8',
    })
  
  }

  public listarAlunos(): Observable<any>{

    let a = this.httpClient.get<any>("http://localhost:3000/v1/aluno",
     this.httpOptions
    )
   
    return a

  }


}
