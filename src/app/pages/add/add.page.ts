import { Component, OnInit } from '@angular/core';
import { TodoService } from '../../services/todo.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Lista } from 'src/app/models/lista.model';
import { ListaItem } from '../../models/lista-item.model';

@Component({
  selector: 'app-add',
  templateUrl: './add.page.html',
  styleUrls: ['./add.page.scss'],
})
export class AddPage implements OnInit {

lista:Lista;
nombreItem ='';

  constructor(private todoService : TodoService,
              private route :ActivatedRoute) { 

 const listaId = this.route.snapshot.paramMap.get('listaId');
 this.lista = this.todoService.obtenerLista(listaId);
  

  }

  ngOnInit() {
  }

  agregarItem(){
    if ( this.nombreItem.length === 0) {
      return;
    }
    const nuevoItem = new ListaItem(this.nombreItem);
    this.lista.items.push(nuevoItem);
    this.nombreItem='';
    this.todoService.guardarStorage();
  }

  cambioCheckbox(item:ListaItem){
    const pendientes =this.lista.items.filter(itemData=>{
    return !itemData.completado;
    }).length;

    if (pendientes === 0) {
      this.lista.terminadaEn = new Date();
      this.lista.terminada = true;
    }else{
      this.lista.terminadaEn = null;
      this.lista.terminada = false;
    }
    console.log(this.lista);
    console.log({pendientes});

    this.todoService.guardarStorage();
  }


  borrar(i:number){
    this.lista.items.splice(i,1);
    this.todoService.guardarStorage();
  }

}
