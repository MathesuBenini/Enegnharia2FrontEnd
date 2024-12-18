import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GetAlunoService } from './get-aluno.service';
import { ErrorHandler } from '../error-handler';
import { catchError, throwError } from 'rxjs';
import { Aluno } from '../form-aluno/aluno';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-data-aluno',
  templateUrl: './data-aluno.component.html',
  styleUrls: ['./data-aluno.component.css']
})
export class DataAlunoComponent {

  constructor(
    private activatedRoute : ActivatedRoute,
    private getAlunoService: GetAlunoService,
    private router: Router
  ){}

  public matricula:string = this.activatedRoute.snapshot.paramMap.get("matricula")!

  public hasError:boolean = false
  public error:ErrorHandler | null = null

  public hasDebito: boolean = false

  public aluno: Aluno | undefined

  
  public debitoForm = new FormGroup({
    debito: new FormControl<number | undefined>(undefined),
  })

  public setHasError(hasError:boolean){
    this.hasError = hasError
  }

  public setHasDebito(){
    this.hasDebito = !this.hasDebito
  }


  public setError(error:ErrorHandler | null){
    this.error = error
  }

  ngOnInit(): void {
    this.getAlunoService.getAluno(parseInt(this.matricula))
    .pipe(catchError(err => {
      console.log(err)
       return throwError(() => new Error(err));
     }))
     .subscribe(res => {
       this.aluno = res
       console.log(this.aluno)
     })
  }

  public criarDebito(){
    console.log("opa")
    this.getAlunoService.criarDebitoAluno(parseInt(this.matricula), this.debitoForm.value.debito!)
    .pipe(catchError(err => {
      if(err.status === 200){
        location.reload()
      }
     
       return throwError(() => new Error(err));
     }))
     .subscribe(res => {
        location.reload()
     })

     
  }


  public calcularDebitos(){
    return this.aluno!.debitos?.reduce((acumulator, debito) => acumulator + debito.valor).valor

  }

  public goToMenu(){
    this.router.navigate(['menu'])
  }

}
