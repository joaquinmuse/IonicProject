import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { TodoService } from '../../services/todo.service';
import { Router } from '@angular/router';
import { Lista } from '../../models/lista.model';
import { AlertController, IonList } from '@ionic/angular';

@Component({
  selector: 'app-listas',
  templateUrl: './listas.component.html',
  styleUrls: ['./listas.component.scss'],
})
export class ListasComponent implements OnInit {

  @ViewChild(IonList) lista:IonList;
  @Input() terminada = true;


  constructor(public todoService:TodoService,private router:Router,private alertController : AlertController) { }

  ngOnInit() {}

  listaSeleccionada(lista:Lista){
    if(this.terminada){
      this.router.navigateByUrl(`tabs/tab2/add/${lista.id}`);
    }else{
      this.router.navigateByUrl(`tabs/tab1/add/${lista.id}`);
    }
   
  }

  borrarLista(item:Lista){
    this.todoService.borrarLista(item);
  }

  async editarTituloLista(item:Lista){
      const alert = await this.alertController.create({
        header: 'Editar Nombre',
        message: 'Ingrese el nuevo nombre para la lista',
        inputs:[
          {
            name:'titulo',
            type:'text',
            value:item.titulo,
            placeholder:'Nombre de la lista'
          }
        ],
        buttons: [
          {
            text: 'Cancelar',
            role: 'cancel',
            cssClass: 'secondary',
            handler: () => {
              console.log('Cancel');
              this.lista.closeSlidingItems();
            }
          }, {
            text: 'Guardar',
            handler: (data) => {
              if (data.titulo.length === 0) {
                return;
              }
              //editar la lista
             this.todoService.editarLista(item,data.titulo);
             this.lista.closeSlidingItems();
            }
          }
        ]
      });
    
      await alert.present();
    }
}
