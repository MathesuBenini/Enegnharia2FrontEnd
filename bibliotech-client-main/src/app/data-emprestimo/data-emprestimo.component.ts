import { Component, OnInit } from '@angular/core';
import { GetEmprestimoService } from './get-emprestimo.service';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { EmprestimoDevolucao } from './emprestimoDevolucao';
import { ErrorHandler } from '../error-handler';

@Component({
  selector: 'app-data-emprestimo',
  templateUrl: './data-emprestimo.component.html',
  styleUrls: ['./data-emprestimo.component.css']
})
export class DataEmprestimoComponent implements OnInit {

  constructor(
    private activatedRoute : ActivatedRoute,
    private getEmprestimoService: GetEmprestimoService,
    private router: Router
  ){}

  public idEmprestimo:string = this.activatedRoute.snapshot.paramMap.get("idEmprestimo")!

  public emprestimo:EmprestimoDevolucao | undefined

  public hasError:boolean = false
  public error:ErrorHandler | null = null

  public setHasError(hasError:boolean){
    this.hasError = hasError
  }

  public setError(error:ErrorHandler | null){
    this.error = error
  }

  ngOnInit(): void {
    this.getEmprestimoService.getEmprestimo(parseInt(this.idEmprestimo))
    .pipe(catchError(err => {
      console.log(err)
       return throwError(() => new Error(err));
     }))
     .subscribe(res => {
       this.emprestimo = res
       console.log(this.emprestimo)
     })
  }


  public devolver(){
    this.getEmprestimoService.deleteEmprestimo(this.emprestimo!.idEmprestimo!)
    .pipe(catchError(err => {
      try {
        if(err.status === 200){
          this.router.navigate([`emprestimos`])
        }
        console.log(err)
        this.setHasError(true);
        this.setError({
          errorCode: 400,
          errorMessage: err.error.errorMessage ?? "Houve um erro"
        })
        setTimeout(() => this.setHasError(false), 2000)
      } catch (error:any) {
        this.setHasError(true);
        this.setError({
          errorCode: 400,
          errorMessage: "Houve um erro, tente novamente"
        })
        setTimeout(() => this.setHasError(false), 2000)
      } finally{
        return throwError(() => new Error(err));
      }
      
  }))
  .subscribe(res => {
    if(res != null){
      
      this.router.navigate([`emprestimos`])

    }

  })
}

}
