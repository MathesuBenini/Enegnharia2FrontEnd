import { Component, OnInit } from '@angular/core';
import { ErrorHandler } from '../error-handler';
import { FormControl, FormGroup } from '@angular/forms';
import { ListLivrosService } from '../list-livros/list-livros.service';
import { catchError, throwError } from 'rxjs';
import { Livro } from '../form-livro/livro';
import { LivrosCheckbox } from './livrosCheckbox';
import { LivroService } from '../form-livro/livro.service';
import { ItemEmprestimo } from './itemEmprestimo';
import { EmprestimoService } from './emprestimo.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form-emprestimo',
  templateUrl: './form-emprestimo.component.html',
  styleUrls: ['./form-emprestimo.component.css']
})
export class FormEmprestimoComponent implements OnInit {

  constructor(
    private listLivrosService: ListLivrosService,
    private emprestimoService: EmprestimoService,
    private router: Router
  ){}

 
  public listaLivros: Livro[] | undefined | any

  public livrosCheckbox: LivrosCheckbox[] = new Array()

  public itensEmprestimo: ItemEmprestimo[] = new Array()

  public valorTotal:number = 0.0

  public dataDevolucao: Date | undefined
  
 
  ngOnInit(): void {
    this.listLivrosService.listarLivros()
    .pipe(catchError(err => {
     
      return throwError(() => new Error(err));
    }))
    .subscribe(res => {
      this.listaLivros = res

      console.log(this.listaLivros)

      for(let i = 0; i < this.listaLivros.length; i++){
        console.log(this.listaLivros[i])
        this.livrosCheckbox!.push({
          index: i,
          livro: this.listaLivros[i],
          checked: false
        })
      }
     

    })

   

  

  }

  public hasError:boolean = false
  public error:ErrorHandler | null = null

  public emprestimoForm = new FormGroup({
    matricula: new FormControl<number>(0),
  })

  public onSubmit(){

    let filteredLivrosCheckbox = this.filterListaLivros();

    if((this.emprestimoForm.value.matricula === undefined || 
      this.emprestimoForm.value.matricula === null ||
      this.emprestimoForm.value.matricula === 0) 
      ||
      (filteredLivrosCheckbox.length = 0)
     ){
  
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

        this.setDataDevolucao()
        this.setItensEmprestimo()
        console.log({
          matricula: this.emprestimoForm.value.matricula,
          dataDevolucao: this.dataDevolucao,
          valorTotal: this.valorTotal,
          itensEmprestimo: this.itensEmprestimo
        })
          this.emprestimoService.cadastrarEmprestimo({
            matricula: this.emprestimoForm.value.matricula,
            dataDevolucao: this.dataDevolucao!,
            valorTotal: this.valorTotal,
            itensEmprestimo: this.itensEmprestimo
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
              
              this.router.navigate([``])

            }
  
          })
      }
  }

  public filterListaLivros(){
    return this.livrosCheckbox.filter(livro => livro.checked)

  }


  public setHasError(hasError:boolean){
    this.hasError = hasError
  }

  public setError(error:ErrorHandler | null){
    this.error = error
  }

  public setDataDevolucao(){
    let somaPrazo = this.livrosCheckbox.reduce((acumulator, livro) =>{
      return acumulator + livro.livro.titulo.prazo
      
    }, 0)

    this.dataDevolucao = new Date(new Date().getTime() + somaPrazo *24 *60 *60 *1000)

  }

  public setItensEmprestimo(){
    
    for(let i = 0; i < this.livrosCheckbox.length; i++){
      let data = new Date(new Date().getTime() + this.livrosCheckbox[i].livro.titulo.prazo *24 *60 *60 *1000) 
      this.itensEmprestimo.push({
       livro: {
       id: this.livrosCheckbox[i].livro.id
      },
       dataDevolucao: data,
       dataPrevista: data
      })
    }

  }

  public setChecked(index:number){
    this.livrosCheckbox[index].checked = !this.livrosCheckbox[index].checked
    console.log(this.livrosCheckbox[index].checked)
  }

}
