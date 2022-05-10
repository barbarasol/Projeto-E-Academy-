import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-professor',
  templateUrl: './professor.component.html',
  styleUrls: ['./professor.component.css']
})
export class ProfessorComponent implements OnInit {

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  mudarParaRotaCadastro(){
    this.router.navigate(['/professor/cadastro'])
  }

  mudarParaRotaLista(){
    this.router.navigate(['/professor/lista'])
  }

}
