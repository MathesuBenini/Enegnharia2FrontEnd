export interface EmprestimoDevolucao{
    idEmprestimo:number
    dataEmprestimo:Date
    devolucao:{
        idDevolucao:number
        dataDevolucao: Date
        multa:number
        atraso:number
        valotTotal:number
    }
    itensDevolucao: any[]

}