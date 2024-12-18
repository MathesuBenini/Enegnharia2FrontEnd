import { Component, OnInit } from '@angular/core';
import { LivroService } from './livro.service';
import { Router } from '@angular/router';
import { ErrorHandler } from '../error-handler';
import { FormControl, FormGroup } from '@angular/forms';
import { catchError, throwError } from 'rxjs';
import { AreaService } from './area.service';

@Component({
  selector: 'app-form-livro',
  templateUrl: './form-livro.component.html',
  styleUrls: ['./form-livro.component.css']
})
export class FormLivroComponent implements OnInit{

  
  constructor(
    private livroService: LivroService,
    private areaService: AreaService,
    private router: Router
  ){}

  public hasError:boolean = false
  public error:ErrorHandler | null = null

  public areas = null

  public livroForm = new FormGroup({
    dataPrevista: new FormControl<Date | undefined>(undefined),
    ano: new FormControl<string | undefined>(undefined),
    isbn: new FormControl<string | undefined>(undefined),
    edicao: new FormControl<string | undefined>(undefined),
    prazo: new FormControl<string | undefined>(undefined),
    nome: new FormControl<string | undefined>(undefined),
    areaId: new FormControl<number | undefined>(undefined),
    nomeAutor: new FormControl<string | undefined>(undefined),
  })

  ngOnInit(): void {
    
    this.areaService.listarAreas()
    .pipe(catchError(err => {
     
      return throwError(() => new Error(err));
    }))
    .subscribe(res => {
      this.areas = res
    })
    
  }

  public setHasError(hasError:boolean){
    this.hasError = hasError
  }

  public setError(error:ErrorHandler | null){
    this.error = error
  }


  public onSubmit(){
    if((this.livroForm.value.dataPrevista === undefined || 
      this.livroForm.value.dataPrevista === null) 
      || 
      (this.livroForm.value.ano === undefined ||
      this.livroForm.value.ano === null ||
      this.livroForm.value.ano === "")
      ||
      (this.livroForm.value.isbn === undefined ||
        this.livroForm.value.isbn === null ||
        this.livroForm.value.isbn === "")
      ||
      (this.livroForm.value.edicao === undefined ||
        this.livroForm.value.edicao === null ||
        this.livroForm.value.edicao === "")
      ||
      (this.livroForm.value.prazo === undefined ||
        this.livroForm.value.prazo === null ||
        this.livroForm.value.prazo === "")
      ||
      (this.livroForm.value.nome === undefined ||
        this.livroForm.value.nome === null ||
        this.livroForm.value.nome === "")
      ||
      (this.livroForm.value.areaId === undefined ||
        this.livroForm.value.areaId === null ||
        this.livroForm.value.areaId === 0)
      ||
      (this.livroForm.value.nomeAutor === undefined ||
        this.livroForm.value.nomeAutor === null ||
        this.livroForm.value.nomeAutor === "")
        ){
  
        this.setHasError(true)
        this.setError({
          errorCode: 400,
          errorMessage: "Todos os campos devem ser preenchidos" 
        })
        setTimeout(() => this.setHasError(false), 1500)
        
      }
      // else if(this.LivroForm.value.cpf.match(/^[0-9]*3.[0-9]*3.[0-9]*3-[0-9]*2/g) == null){
  
      //   this.setHasError(true);
      //   this.setError({
      //     errorCode: 400,
      //     errorMessage: "Campo deve ser um cpf" 
      //   })
      //   setTimeout(() => this.setHasError(false), 2000)
  
      // }
      else{
          // console.log({
          //   dataPrevista: this.livroForm.value.dataPrevista,
          //   ano: parseInt(this.livroForm.value.ano),
          //   isbn: this.livroForm.value.isbn,
          //   edicao:parseInt(this.livroForm.value.edicao),
          //   prazo: parseInt(this.livroForm.value.prazo),
          //   nome: this.livroForm.value.nome,
          //   areaId:this.livroForm.value.areaId
          // })
          this.livroService.cadastrarLivro({
            dataPrevista: this.livroForm.value.dataPrevista,
            ano: parseInt(this.livroForm.value.ano),
            isbn: this.livroForm.value.isbn,
            edicao:parseInt(this.livroForm.value.edicao),
            prazo: parseInt(this.livroForm.value.prazo),
            nome: this.livroForm.value.nome,
            areaId:this.livroForm.value.areaId,
            nomeAutor: this.livroForm.value.nomeAutor
          })
          .pipe(catchError(err => {
              try {
                if(err.status === 200){
                  this.router.navigate([`livros`])
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
              
              this.router.navigate([`livros`])

            }
  
          })
      }

  }


}
