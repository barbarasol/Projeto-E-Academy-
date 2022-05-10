import { Injectable } from '@angular/core';

import { BuscarListaProfessoresService } from '../professor/buscar-lista-professores.service';

@Injectable({
  providedIn: 'root'
})
export class BuscaUsuariosService {

  administradoresCadastrados = [
    {
      usuario: "lucas_roberto",
      registro: "uc2342",
      senha: "223142"
    },
    {
      usuario: "carlos_augusto",
      registro: "uc5326",
      senha: "024524"
    }
  ]

  constructor(
    private buscaProfessores: BuscarListaProfessoresService,
  ) { }

  validaAdministrador(admin: any){
    var adminValido = false;
    for(let i=0; i<this.administradoresCadastrados.length; i++){
      if(this.administradoresCadastrados[i].usuario === admin.usuario && this.administradoresCadastrados[i].senha === admin.senha){
        adminValido = true;
      }
    }
    return adminValido;
  }


  obtemListaProfessores(){
    var professores;
    if(this.buscaProfessores.obterListaProfessores().length>0){
      professores = this.buscaProfessores.obterListaProfessores();
      return professores;
    }else{
      return []
    }
  }


}
