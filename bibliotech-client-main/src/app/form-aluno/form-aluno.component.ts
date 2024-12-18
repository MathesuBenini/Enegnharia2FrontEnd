import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ErrorHandler } from '../error-handler';
import { AlunoService } from './aluno.service';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';

@Component({
  selector: 'app-form-aluno',
  templateUrl: './form-aluno.component.html',
  styleUrls: ['./form-aluno.component.css']
})
export class FormAlunoComponent {

  constructor(
    private alunoService: AlunoService,
    private router: Router
  ){}

  public hasError:boolean = false
  public error:ErrorHandler | null = null

  public alunoForm = new FormGroup({
    nome: new FormControl<string | undefined>(undefined),
    cpf: new FormControl<string | undefined>(undefined),
    endereco: new FormControl<string | undefined>(undefined)
  })

  public setHasError(hasError:boolean){
    this.hasError = hasError
  }

  public setError(error:ErrorHandler | null){
    this.error = error
  }


  public onSubmit(){
    if((this.alunoForm.value.nome === undefined || 
      this.alunoForm.value.nome === null ||
      this.alunoForm.value.nome === "") 
      || 
      (this.alunoForm.value.cpf === undefined ||
      this.alunoForm.value.cpf === null ||
      this.alunoForm.value.cpf === "")
      ||
      (this.alunoForm.value.endereco === undefined ||
        this.alunoForm.value.endereco === null ||
        this.alunoForm.value.endereco === "")){
  
        this.setHasError(true)
        this.setError({
          errorCode: 400,
          errorMessage: "Todos os campos devem ser preenchidos" 
        })
        setTimeout(() => this.setHasError(false), 1500)
        
      }
      // else if(this.alunoForm.value.cpf.match(/^[0-9]*3.[0-9]*3.[0-9]*3-[0-9]*2/g) == null){
  
      //   this.setHasError(true);
      //   this.setError({
      //     errorCode: 400,
      //     errorMessage: "Campo deve ser um cpf" 
      //   })
      //   setTimeout(() => this.setHasError(false), 2000)
  
      // }
      else{
  
          this.alunoService.cadastrarAluno({
            nome: this.alunoForm.value.nome,
            cpf: this.alunoForm.value.cpf,
            endereco: this.alunoForm.value.endereco
          })
          .pipe(catchError(err => {
              try {
                if(err.status === 200){
                  this.router.navigate([`alunos`])
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
              
              this.router.navigate([`alunos`])

            }
  
          })
      }

  }
}
