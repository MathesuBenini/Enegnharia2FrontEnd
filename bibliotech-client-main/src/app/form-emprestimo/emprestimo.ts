import { ItemEmprestimo } from "./itemEmprestimo";

export interface Emprestimo{
    matricula: number,
    dataDevolucao: Date,
    valorTotal:number,
    itensEmprestimo: ItemEmprestimo[],
}