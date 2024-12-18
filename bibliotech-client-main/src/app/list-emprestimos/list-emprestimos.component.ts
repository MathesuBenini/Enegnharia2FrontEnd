import { Component } from '@angular/core';
import { EmprestimosService } from './emprestimos.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import { ErrorHandler } from '../error-handler';
import { catchError, throwError } from 'rxjs';
import { ListaEmprestimos } from './listaEmprestimos';
import { Aluno } from '../form-aluno/aluno';

@Component({
  selector: 'app-list-emprestimos',
  templateUrl: './list-emprestimos.component.html',
  styleUrls: ['./list-emprestimos.component.css']
})
export class ListEmprestimosComponent {

  constructor(
    private emprestimosService: EmprestimosService,
    private router: Router
  ){}

  public listaEmprestimos:  ListaEmprestimos[] = new Array()

  public hasError:boolean = false
  public error:ErrorHandler | null = null

  public aluno: Aluno | undefined 
  
  public emprestimosForm = new FormGroup({
    matricula: new FormControl<number>(0),
  })


  
  public setHasError(hasError:boolean){
    this.hasError = hasError
  }

  public setError(error:ErrorHandler | null){
    this.error = error
  }

  public onSubmit(){
    if((this.emprestimosForm.value.matricula === undefined || 
      this.emprestimosForm.value.matricula === null ||
      this.emprestimosForm.value.matricula === 0) ){
  
        this.setHasError(true)
        this.setError({
          errorCode: 400,
          errorMessage: "Todos os campos devem ser preenchidos" 
        })
        setTimeout(() => this.setHasError(false), 1500)
        
      }

      else{
    
          this.emprestimosService.listarEmprestimos(this.emprestimosForm.value.matricula)
          .pipe(catchError(err => {
              try {
               
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
              
      
              this.listaEmprestimos = res
              console.log(res)
             
            }
  
          })

          this.emprestimosService.getAluno(this.emprestimosForm.value.matricula)
          .pipe(catchError(err => {
            try {
             
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
            
    
            this.aluno = res
         
           
          }

        })
      }
  }

  public goToEmprestimo(idEmprestimo:number){
    this.router.navigate(['emprestimo/'+idEmprestimo])
  }

  public goToMenu(){
    this.router.navigate(['menu'])
  }



  

}
