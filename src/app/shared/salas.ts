import { Aluno } from "./aluno";


export class Salas
{
  nome: string = '';
  semestre: string = '';
  cargaHoraria: string = '';
  periodo: string = '';
  id: number = 0;
  nomeProfessor: string = '';
  sobrenomeProfessor: string = '';
  listaAlunos: Aluno[] = []
}
